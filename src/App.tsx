import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import TaskBoard from './components/TaskBoard'

export default function App() {
  const [lightTheme, setLightTheme] = useState<boolean>(false);

  return (
    <div className={`task-manager ${lightTheme === true ? 'light-theme' : ''}`}>
      <Sidebar
        lightTheme={lightTheme}
        setLightTheme={setLightTheme}
      />
      <TaskBoard />
    </div>
  )
}
