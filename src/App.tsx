import './App.css';
import { useEffect } from 'react';
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
  const { boards, selectedBoardId } = useSelector((state: RootState) => state.boards);
  const { renderNewBoard, renderNewTask } = useSelector((state: RootState) => state.ui)

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

  const [colorTheme, setColorTheme] = useLocalStorage<boolean>('colorTheme', false);

  return (
    <div className={`task-manager ${colorTheme === true ? 'light-theme' : ''}`}>
      <Sidebar
        colorTheme={colorTheme}
        setColorTheme={setColorTheme}
        updateBoardsInLocalStorage={updateBoardsInLocalStorage}
      />
      <DndProvider backend={HTML5Backend}>
        <TaskBoard
          updateBoardsInLocalStorage={updateBoardsInLocalStorage}
        />
      </DndProvider>
      {renderNewBoard && (
        <>
          <Overlay />
          <NewBoard
            addBoard={(newBoardInfo) => addBoard(newBoardInfo, dispatch, boards, updateBoardsInLocalStorage)}
            updateBoard={(updatedBoard) => updateBoard(updatedBoard, dispatch, boards, updateBoardsInLocalStorage)}
          />
        </>
      )}
      {renderNewTask && (
        <>
          <Overlay />
          <NewTask
            addTask={(newTaskInfo) => addTask(newTaskInfo, selectedBoardId, dispatch, boards, updateBoardsInLocalStorage)}
            updateTask={(updatedTaskInfo) => updateTask(updatedTaskInfo, selectedBoardId, dispatch, boards, updateBoardsInLocalStorage)}
            colorTheme={colorTheme}
            updateBoardsInLocalStorage={updateBoardsInLocalStorage}
          />
        </>
      )}
    </div>
  )
}