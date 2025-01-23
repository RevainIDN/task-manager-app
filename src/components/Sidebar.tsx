import { SetStateAction } from 'react'
import '../styles/Sidebar.css'
import Board from './Board'

interface SidebarProps {
	lightTheme: boolean;
	setLightTheme: React.Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({ lightTheme, setLightTheme }: SidebarProps) {
	const handleSwitch = () => {
		setLightTheme(prev => !prev)
	}

	return (
		<div className='sidebar-boards'>
			<div className='switch-sidebar-cont'>
				<button className='switch-sidebar'>
					<img src={`${lightTheme === false ? 'Close_round-dark_theme.svg' : 'Close_round-light_theme.svg'}`} alt="" />

				</button>
			</div>
			<ul className='boards-list'>
				<Board />
				<li className='board-add-new'>
					<img src={`${lightTheme === false ? 'Add_round_fill-dark_theme.svg' : 'Add_round_fill-light_theme.svg'}`} alt="" />

					<p className='new-board-text'>Add new board</p>
				</li>
			</ul>
			<div className='switch-theme' onClick={handleSwitch}>
				<button className={`theme-btn theme-btn--dark ${lightTheme === false ? 'theme-btn--active' : ''}`}>
					<img src={`${lightTheme === false ? 'Moon_fill-dark_theme.svg' : 'Moon_fill-light_theme.svg'}`} alt="" />

					Dark
				</button>
				<button className={`theme-btn theme-btn--light ${lightTheme === true ? 'theme-btn--active' : ''}`}>
					<img src={`${lightTheme === false ? 'Sun_fill-dark_theme.svg' : 'Sun_fill-light_theme.svg'}`} alt="" />

					Light
				</button>
			</div>
		</div>
	)
}