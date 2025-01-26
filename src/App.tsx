import { useEffect, useState } from 'react'
import { NewBoardInfo } from './types'
import { saveBoardsToLocalStorage, getBoardsInLocalStorage, saveColorThemeToLocalStorage, getColorThemeInLocalStorage } from './utils/localStorage/localStorage'
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import TaskBoard from './components/TaskBoard/TaskBoard'
import NewBoard from './components/NewBoard/NewBoard'
import Overlay from './components/Overlay/Overlay'

export default function App() {
  const [colorTheme, setColorTheme] = useState<boolean>(() => {
    const storedColorTheme = getColorThemeInLocalStorage();
    return storedColorTheme ? storedColorTheme : false;
  });
  const [renderNewBoard, setRenderNewBoard] = useState<boolean>(false);
  const [boards, setBoards] = useState<NewBoardInfo[]>(() => {
    const storedBoards = getBoardsInLocalStorage();
    return storedBoards.length > 0 ? storedBoards : [{
      newBoardName: 'Default Board',
      newBoardLogo: '/task-manager-app/src/assets/board-logo-01.png',
    }];
  });

  useEffect(() => {
    saveColorThemeToLocalStorage(colorTheme);
    saveBoardsToLocalStorage(boards);
  }, [boards, colorTheme]);

  const addBoard = (newBoardInfo: NewBoardInfo) => {
    setBoards(prevBoards => [...prevBoards, newBoardInfo]);
    setRenderNewBoard(false);
  }

  return (
    <div className={`task-manager ${colorTheme === true ? 'light-theme' : ''}`}>
      <Sidebar
        colorTheme={colorTheme}
        setColorTheme={setColorTheme}
        setRenderNewBoard={setRenderNewBoard}
        boards={boards}
      />
      <TaskBoard />
      {renderNewBoard && (
        <>
          <Overlay onClick={() => setRenderNewBoard(false)} />
          <NewBoard
            setRenderNewBoard={setRenderNewBoard}
            addBoard={addBoard}
          />
        </>
      )}
    </div>
  )
}
