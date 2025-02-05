import './App.css';
import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { addBoard, updateBoard, addTask, updateTask } from './utils/boardUtils';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { setBoards } from './store/boardsSlice';
import { setColorTheme } from './store/uiSlice';
import Sidebar from './components/Sidebar/Sidebar';
import TaskBoard from './components/TaskBoard/TaskBoard';
import NewBoard from './components/NewBoard/NewBoard';
import NewTask from './components/NewTask/NewTask';
import Overlay from './components/Overlay/Overlay';

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { boards, selectedBoardId } = useSelector((state: RootState) => state.boards);
  const { colorTheme, renderNewBoard, renderNewTask } = useSelector((state: RootState) => state.ui)

  useEffect(() => {
    const storedState = localStorage.getItem('state');
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      dispatch(setBoards(parsedState.boards.boards));
      dispatch(setColorTheme(parsedState.ui.colorTheme));
    }
  }, [dispatch]);

  return (
    <div className={`task-manager ${colorTheme ? 'light-theme' : ''}`}>
      <Sidebar />
      <DndProvider backend={HTML5Backend}>
        <TaskBoard />
      </DndProvider>
      {renderNewBoard && (
        <>
          <Overlay />
          <NewBoard
            addBoard={(newBoardInfo) => addBoard(newBoardInfo, dispatch, boards)}
            updateBoard={(updatedBoard) => updateBoard(updatedBoard, dispatch, boards)}
          />
        </>
      )}
      {renderNewTask && (
        <>
          <Overlay />
          <NewTask
            addTask={(newTaskInfo) => addTask(newTaskInfo, selectedBoardId, dispatch, boards)}
            updateTask={(updatedTaskInfo) => updateTask(updatedTaskInfo, selectedBoardId, dispatch, boards)}
          />
        </>
      )}
    </div>
  )
}