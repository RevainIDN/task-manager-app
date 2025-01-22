import { useState } from 'react'
import './App.css'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='task-manager'>
      <div className='sidebar-boards'>
        <div className='switch-sidebar-cont'>
          <button className='switch-sidebar'></button>
        </div>
        <ul className='boards-list'>
          <li className='board-item'>
            <img className='board-img' src="board-logo-01.png" alt="" />
            <p className='board-text'></p>
          </li>
        </ul>
        <div className='switch-theme'>
          <button className='theme-btn dark-theme-btn'>Dark</button>
          <button className='theme-btn light-theme-btn'>Light</button>
        </div>
      </div>
      <div className='task-board'></div>
    </div>
  )
}
