import { useEffect, useState } from 'react';
import { NewBoardInfo } from './types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import TaskBoard from './components/TaskBoard/TaskBoard';
import NewBoard from './components/NewBoard/NewBoard';
import NewTask from './components/NewTask/NewTask';
import Overlay from './components/Overlay/Overlay';
import { useLocalStorage } from './hooks/useLocalStorage';
import { addBoard, updateBoard, addTask, updateTask } from './utils/boardUtils';

export default function App() {
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

  const [selectedBoardId, setSelectedBoardId] = useState<number>(1);
  const [currentBoardId, setCurrentBoardId] = useState<number>(() => {
    return boards.length > 0 ? Math.max(...boards.map(board => board.id)) : 1;
  });
  const [currentTaskId, setCurrentTaskId] = useState<number>(() => {
    const allTasks = boards.flatMap(board => board.tasks);
    return allTasks.length > 0 ? Math.max(...allTasks.map(task => task.id)) : 1;
  });

  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [colorTheme, setColorTheme] = useLocalStorage<boolean>('colorTheme', false);
  const [renderNewBoard, setRenderNewBoard] = useState<boolean>(false);
  const [renderNewTask, setRenderNewTask] = useState<boolean>(false);

  useEffect(() => {
    setBoards(boards);
    console.log(boards);
  }, [boards, setBoards]);

  return (
    <div className={`task-manager ${colorTheme === true ? 'light-theme' : ''}`}>
      <Sidebar
        colorTheme={colorTheme}
        setColorTheme={setColorTheme}
        setRenderNewBoard={setRenderNewBoard}
        boards={boards}
        setBoards={setBoards}
        setSelectedBoardId={setSelectedBoardId}
        selectedBoardId={selectedBoardId}
        setEditMode={setEditMode}
      />
      <DndProvider backend={HTML5Backend}>
        <TaskBoard
          selectedBoardId={selectedBoardId}
          boards={boards}
          setBoards={setBoards}
          setRenderNewTask={setRenderNewTask}
          setEditMode={setEditMode}
          setEditTaskId={setEditTaskId}
        />
      </DndProvider>
      {renderNewBoard && (
        <>
          <Overlay
            setRenderNewBoard={setRenderNewBoard}
            setRenderNewTask={setRenderNewTask}
            setEditMode={setEditMode}
            setEditTaskId={setEditTaskId}
          />
          <NewBoard
            editMode={editMode}
            setEditMode={setEditMode}
            selectedBoardId={selectedBoardId}
            boards={boards}
            setRenderNewBoard={setRenderNewBoard}
            addBoard={(newBoardInfo) => addBoard(newBoardInfo, currentBoardId, setCurrentBoardId, currentTaskId, setCurrentTaskId, setBoards, setRenderNewBoard)}
            updateBoard={(updatedBoard) => updateBoard(updatedBoard, setBoards, setEditMode, setRenderNewBoard)}
          />
        </>
      )}
      {renderNewTask && (
        <>
          <Overlay
            setRenderNewBoard={setRenderNewBoard}
            setRenderNewTask={setRenderNewTask}
            setEditMode={setEditMode}
            setEditTaskId={setEditTaskId}
          />
          <NewTask
            selectedBoardId={selectedBoardId}
            boards={boards}
            setBoards={setBoards}
            editMode={editMode}
            setEditMode={setEditMode}
            editTaskId={editTaskId}
            setEditTaskId={setEditTaskId}
            setRenderNewTask={setRenderNewTask}
            addTask={(newTaskInfo) => addTask(newTaskInfo, selectedBoardId, setCurrentTaskId, setBoards, setRenderNewTask)}
            updateTask={(updatedTaskInfo) => updateTask(updatedTaskInfo, selectedBoardId, setBoards, setEditMode, setRenderNewTask, setEditTaskId)}
            colorTheme={colorTheme}
          />
        </>
      )}
    </div>
  )
}