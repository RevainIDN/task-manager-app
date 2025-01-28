import { useEffect, useState } from 'react'
import { NewBoardInfo, BoardTasks } from './types'
import { saveBoardsToLocalStorage, getBoardsInLocalStorage, saveColorThemeToLocalStorage, getColorThemeInLocalStorage } from './utils/localStorage/localStorage'
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import TaskBoard from './components/TaskBoard/TaskBoard'
import NewBoard from './components/NewBoard/NewBoard'
import NewTask from './components/NewTask/NewTask'
import Overlay from './components/Overlay/Overlay'

export default function App() {
  const [currentBoard, setCurrentBoard] = useState<number>(1);
  const [boards, setBoards] = useState<NewBoardInfo[]>(() => {
    const storedBoards = getBoardsInLocalStorage();
    return storedBoards.length > 0 ? storedBoards : [{
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
    }];
  });
  const [currentBoardId, setCurrentBoardId] = useState<number>(() => {
    const storedBoards = getBoardsInLocalStorage();
    return storedBoards.length > 0 ? Math.max(...storedBoards.map(board => board.id)) : 1;
  });
  const [colorTheme, setColorTheme] = useState<boolean>(() => {
    const storedColorTheme = getColorThemeInLocalStorage();
    return storedColorTheme ? storedColorTheme : false;
  });
  const [renderNewBoard, setRenderNewBoard] = useState<boolean>(false);
  const [renderNewTask, setRenderNewTask] = useState<boolean>(false);
  const [editBoard, setEditBoard] = useState<boolean>(false);
  localStorage.clear();

  useEffect(() => {
    saveColorThemeToLocalStorage(colorTheme);
    saveBoardsToLocalStorage(boards);
  }, [boards, colorTheme]);

  const addBoard = (newBoardInfo: NewBoardInfo) => {
    newBoardInfo.id = currentBoardId + 1;
    setBoards(prevBoards => [...prevBoards, newBoardInfo]);
    setCurrentBoardId(currentBoardId + 1);
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

  const addTask = (newTaskInfo: BoardTasks) => {
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
      />
      {renderNewBoard && (
        <>
          <Overlay onClick={() => setRenderNewBoard(false)} />
          <NewBoard
            editBoard={editBoard}
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
          <Overlay onClick={() => setRenderNewTask(false)} />
          <NewTask
            setRenderNewTask={setRenderNewTask}
            addTask={addTask}
          />
        </>
      )}
    </div>
  )
}
