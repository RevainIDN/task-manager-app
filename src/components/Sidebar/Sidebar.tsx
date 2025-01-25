import { useState, SetStateAction } from 'react'
import { NewBoardInfo } from '../../types';
import '../Sidebar/Sidebar.css'
import Board from '../Board/Board'

interface SidebarProps {
	lightTheme: boolean;
	setLightTheme: React.Dispatch<SetStateAction<boolean>>;
	setRenderNewBoard: React.Dispatch<SetStateAction<boolean>>;
	boards: NewBoardInfo[];
}

export default function Sidebar({ lightTheme, setLightTheme, setRenderNewBoard, boards }: SidebarProps) {
	const [closeSidebar, setCloseSidebar] = useState<boolean>(false);

	const handleSwitchColorTheme = () => {
		setLightTheme(prev => !prev)
	}

	const handleCloseSidebar = () => {
		setCloseSidebar(prev => !prev)
	}

	const handleShowNewBoard = () => {
		setRenderNewBoard(true);
	}

	return (
		<div className={`sidebar-boards ${closeSidebar ? 'sidebar-boards--close' : ''}`}>
			<div className='switch-sidebar-cont'>
				<button className='switch-sidebar' onClick={handleCloseSidebar}>
					{closeSidebar ? (
						<img src={`${lightTheme === false ? 'Menu-dark_theme.svg' : 'Menu-light_theme.svg'}`} alt="" />
					) : (
						<img src={`${lightTheme === false ? 'Close_round-dark_theme.svg' : 'Close_round-light_theme.svg'}`} alt="" />
					)}

				</button>
			</div>
			<ul className='boards-list'>
				<Board closeSidebar={closeSidebar} newBoardInfo={{ newBoardName: 'Default Board', newBoardLogo: '/task-manager-app/src/assets/board-logo-01.png' }} />
				{boards.map((board, index) => (
					<Board key={index} newBoardInfo={board} closeSidebar={closeSidebar} />
				))}
				<li className={`board-add-new ${closeSidebar ? 'change-display--close' : ''}`} onClick={handleShowNewBoard}>
					<img src={`${lightTheme === false ? 'Add_round_fill-dark_theme.svg' : 'Add_round_fill-light_theme.svg'}`} alt="" />

					{closeSidebar ? (
						null
					) : (
						<p className='new-board-text'>Add new board</p>
					)}
				</li>
			</ul>
			<div className={`${closeSidebar ? 'switch-theme--close' : 'switch-theme'}`} onClick={handleSwitchColorTheme}>
				{closeSidebar ? (
					<button className='theme-btn--active'>
						<img src={`${lightTheme === false ? 'Moon_fill-dark_theme.svg' : 'Sun_fill-light_theme.svg'}`} alt="" />
					</button>
				) : (
					<>
						<button className={`theme-btn theme-btn--dark ${lightTheme === false ? 'theme-btn--active' : ''}`}>
							<img src={`${lightTheme === false ? 'Moon_fill-dark_theme.svg' : 'Moon_fill-light_theme.svg'}`} alt="" />

							Dark
						</button>
						<button className={`theme-btn theme-btn--light ${lightTheme === true ? 'theme-btn--active' : ''}`}>
							<img src={`${lightTheme === false ? 'Sun_fill-dark_theme.svg' : 'Sun_fill-light_theme.svg'}`} alt="" />

							Light
						</button>
					</>
				)}
			</div>
		</div>
	)
}