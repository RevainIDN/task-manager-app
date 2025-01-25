import { useState } from 'react'
import { NewBoardInfo } from './types'
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import TaskBoard from './components/TaskBoard/TaskBoard'
import NewBoard from './components/NewBoard/NewBoard'
import Overlay from './components/Overlay/Overlay'

export default function App() {
  const [lightTheme, setLightTheme] = useState<boolean>(false);
  const [renderNewBoard, setRenderNewBoard] = useState<boolean>(false);
  const [boards, setBoards] = useState<NewBoardInfo[]>([]);

  const addBoard = (newBoardInfo: NewBoardInfo) => {
    setBoards(prevBoards => [...prevBoards, newBoardInfo]);
    setRenderNewBoard(false);
  }

  return (
    <div className={`task-manager ${lightTheme === true ? 'light-theme' : ''}`}>
      <Sidebar
        lightTheme={lightTheme}
        setLightTheme={setLightTheme}
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
