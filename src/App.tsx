import './App.css';
import { useEffect, useState } from 'react';
import { NewBoardInfo } from './types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useLocalStorage } from './hooks/useLocalStorage';
import { addBoard, updateBoard, addTask, updateTask } from './utils/boardUtils';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { setBoards } from './store/boardsSlice';
import logos from './assets/logos';
import Sidebar from './components/Sidebar/Sidebar';
import TaskBoard from './components/TaskBoard/TaskBoard';
import NewBoard from './components/NewBoard/NewBoard';
import NewTask from './components/NewTask/NewTask';
import Overlay from './components/Overlay/Overlay';

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const boards = useSelector((state: RootState) => state.boards.boards);

  const [boardsStorage, setBoardsStorage] = useLocalStorage<NewBoardInfo[]>('boards', [
    {
      id: 1,
      newBoardName: 'Default Board',
      newBoardLogo: logos[0],
      tasks: [
        {
          id: 1,
          img: '',
          title: 'Default Task',
          tags: [{ tag: 'Concept', color: 'red' }],
          status: 'Backlog',
        },
      ],
    },
  ]);
  console.log(boards)
  useEffect(() => {
    if (boardsStorage.length > 0) {
      dispatch(setBoards(boardsStorage));
    }
  }, [boardsStorage, dispatch]);

  const updateBoardsInLocalStorage = (updatedBoards: NewBoardInfo[]) => {
    setBoardsStorage(updatedBoards);
  };

  const [selectedBoardId, setSelectedBoardId] = useState<number>(1);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [colorTheme, setColorTheme] = useLocalStorage<boolean>('colorTheme', false);
  const [renderNewBoard, setRenderNewBoard] = useState<boolean>(false);
  const [renderNewTask, setRenderNewTask] = useState<boolean>(false);



  return (
    <div className={`task-manager ${colorTheme === true ? 'light-theme' : ''}`}>
      <Sidebar
        colorTheme={colorTheme}
        setColorTheme={setColorTheme}
        setRenderNewBoard={setRenderNewBoard}
        setSelectedBoardId={setSelectedBoardId}
        selectedBoardId={selectedBoardId}
        setEditMode={setEditMode}
      />
      <DndProvider backend={HTML5Backend}>
        <TaskBoard
          selectedBoardId={selectedBoardId}
          setRenderNewTask={setRenderNewTask}
          setEditMode={setEditMode}
          setEditTaskId={setEditTaskId}
          updateBoardsInLocalStorage={updateBoardsInLocalStorage}
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
            setRenderNewBoard={setRenderNewBoard}
            addBoard={(newBoardInfo) => addBoard(newBoardInfo, dispatch, boards, setRenderNewBoard, updateBoardsInLocalStorage)}
            updateBoard={(updatedBoard) => updateBoard(updatedBoard, dispatch, boards, setEditMode, setRenderNewBoard, updateBoardsInLocalStorage)}
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
            editMode={editMode}
            setEditMode={setEditMode}
            editTaskId={editTaskId}
            setEditTaskId={setEditTaskId}
            setRenderNewTask={setRenderNewTask}
            addTask={(newTaskInfo) => addTask(newTaskInfo, selectedBoardId, dispatch, boards, setRenderNewTask, updateBoardsInLocalStorage)}
            updateTask={(updatedTaskInfo) => updateTask(updatedTaskInfo, selectedBoardId, dispatch, boards, setEditMode, setRenderNewTask, setEditTaskId, updateBoardsInLocalStorage)}
            colorTheme={colorTheme}
          />
        </>
      )}
    </div>
  )
}