import { useEffect, useState } from 'react';
import { NewBoardInfo, BoardTasks } from './types';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import TaskBoard from './components/TaskBoard/TaskBoard';
import NewBoard from './components/NewBoard/NewBoard';
import NewTask from './components/NewTask/NewTask';
import Overlay from './components/Overlay/Overlay';
import { useLocalStorage } from './hooks/useLocalStorage';

export default function App() {
  const [currentBoard, setCurrentBoard] = useState<number>(1);
  const [boards, setBoards] = useLocalStorage<NewBoardInfo[]>('boards', [{
    id: 1,
    newBoardName: 'Default Board',
    newBoardLogo: '/task-manager-app/src/assets/board-logo-01.png',
    tasks: [{
      id: 1,
      img: '',
      title: 'Default Task',
      tags: [{
        tag: 'Concept',
        color: 'red',
      }],
      status: 'Backlog',
    }],
  }]);
  const [currentBoardId, setCurrentBoardId] = useState<number>(() => {
    return boards.length > 0 ? Math.max(...boards.map(board => board.id)) : 1;
  });
  const [currentTaskId, setCurrentTaskId] = useState<number>(() => {
    const allTasks = boards.flatMap(board => board.tasks);
    return allTasks.length > 0 ? Math.max(...allTasks.map(task => task.id)) : 1;
  });
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [colorTheme, setColorTheme] = useLocalStorage<boolean>('colorTheme', false);
  const [renderNewBoard, setRenderNewBoard] = useState<boolean>(false);
  const [renderNewTask, setRenderNewTask] = useState<boolean>(false);
  const [editBoard, setEditBoard] = useState<boolean>(false);

  useEffect(() => {
    setBoards(boards);
  }, [boards, setBoards]);

  const addBoard = (newBoardInfo: NewBoardInfo) => {
    newBoardInfo.id = currentBoardId + 1;
    setCurrentBoardId(currentBoardId + 1);

    setBoards(prevBoards => {
      const updatedTasks = newBoardInfo.tasks.map(task => {
        const newTaskId = currentTaskId + 1;
        setCurrentTaskId(newTaskId);
        return { ...task, id: newTaskId };
      });

      return [...prevBoards, { ...newBoardInfo, tasks: updatedTasks }];
    });

    setRenderNewBoard(false);
  }

  const updateBoard = (updatedBoard: NewBoardInfo) => {
    setBoards(prevBoards =>
      prevBoards.map(board =>
        board.id === updatedBoard.id ? updatedBoard : board
      )
    );
    setEditBoard(false);
    setRenderNewBoard(false);
  }

  const updateTask = (updatedTaskInfo: BoardTasks) => {
    setBoards(prevBoards =>
      prevBoards.map(board =>
        board.id === currentBoard
          ? {
            ...board,
            tasks: board.tasks.map(task =>
              task.id === updatedTaskInfo.id ? updatedTaskInfo : task
            ),
          }
          : board
      )
    );
    setEditBoard(false);
    setRenderNewTask(false);
    setEditTaskId(null);
  }

  const addTask = (newTaskInfo: BoardTasks) => {
    setCurrentTaskId(prevTaskId => {
      const newTaskId = prevTaskId + 1;
      newTaskInfo.id = newTaskId;
      return newTaskId;
    });
    setBoards(prevBoards =>
      prevBoards.map(board =>
        board.id === currentBoard
          ? { ...board, tasks: [...board.tasks, newTaskInfo] }
          : board
      )
    );
    setRenderNewTask(false);
  };

  return (
    <div className={`task-manager ${colorTheme === true ? 'light-theme' : ''}`}>
      <Sidebar
        colorTheme={colorTheme}
        setColorTheme={setColorTheme}
        setRenderNewBoard={setRenderNewBoard}
        boards={boards}
        setBoards={setBoards}
        setCurrentBoard={setCurrentBoard}
        currentBoard={currentBoard}
        setEditBoard={setEditBoard}
      />
      <TaskBoard
        currentBoard={currentBoard}
        boards={boards}
        setRenderNewTask={setRenderNewTask}
        setEditBoard={setEditBoard}
        setEditTaskId={setEditTaskId}
      />
      {renderNewBoard && (
        <>
          <Overlay
            setRenderNewBoard={setRenderNewBoard}
            setRenderNewTask={setRenderNewTask}
            setEditBoard={setEditBoard}
            setEditTaskId={setEditTaskId}
          />
          <NewBoard
            editBoard={editBoard}
            setEditBoard={setEditBoard}
            currentBoard={currentBoard}
            boards={boards}
            setRenderNewBoard={setRenderNewBoard}
            addBoard={addBoard}
            updateBoard={updateBoard}
          />
        </>
      )}
      {renderNewTask && (
        <>
          <Overlay
            setRenderNewBoard={setRenderNewBoard}
            setRenderNewTask={setRenderNewTask}
            setEditBoard={setEditBoard}
            setEditTaskId={setEditTaskId}
          />
          <NewTask
            currentBoard={currentBoard}
            boards={boards}
            setBoards={setBoards}
            editBoard={editBoard}
            setEditBoard={setEditBoard}
            editTaskId={editTaskId}
            setEditTaskId={setEditTaskId}
            setRenderNewTask={setRenderNewTask}
            addTask={addTask}
            updateTask={updateTask}
            colorTheme={colorTheme}
          />
        </>
      )}
    </div>
  )
}