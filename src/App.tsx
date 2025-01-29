import { useEffect, useState } from 'react';
import { NewBoardInfo } from './types';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import TaskBoard from './components/TaskBoard/TaskBoard';
import NewBoard from './components/NewBoard/NewBoard';
import NewTask from './components/NewTask/NewTask';
import Overlay from './components/Overlay/Overlay';
import { useLocalStorage } from './hooks/useLocalStorage';
import { addBoard, updateBoard, addTask, updateTask } from './utils/boardUtils';

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
            addBoard={(newBoardInfo) => addBoard(newBoardInfo, currentBoardId, setCurrentBoardId, currentTaskId, setCurrentTaskId, setBoards, setRenderNewBoard)}
            updateBoard={(updatedBoard) => updateBoard(updatedBoard, setBoards, setEditBoard, setRenderNewBoard)}
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
            addTask={(newTaskInfo) => addTask(newTaskInfo, currentBoard, setCurrentTaskId, setBoards, setRenderNewTask)}
            updateTask={(updatedTaskInfo) => updateTask(updatedTaskInfo, currentBoard, setBoards, setEditBoard, setRenderNewTask, setEditTaskId)}
            colorTheme={colorTheme}
          />
        </>
      )}
    </div>
  )
}