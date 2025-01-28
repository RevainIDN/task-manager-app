import { useState, SetStateAction } from 'react'
import { NewBoardInfo } from '../../types';
import '../Sidebar/Sidebar.css'
import Board from '../Board/Board'

interface SidebarProps {
	colorTheme: boolean;
	setColorTheme: React.Dispatch<SetStateAction<boolean>>;
	setRenderNewBoard: React.Dispatch<SetStateAction<boolean>>;
	boards: NewBoardInfo[];
	setBoards: React.Dispatch<SetStateAction<NewBoardInfo[]>>;
	currentBoard: number;
	setCurrentBoard: React.Dispatch<SetStateAction<number>>;
}

export default function Sidebar({ colorTheme, setColorTheme, setRenderNewBoard, boards, setBoards, currentBoard, setCurrentBoard }: SidebarProps) {
	const [closeSidebar, setCloseSidebar] = useState<boolean>(false);

	const handleSwitchColorTheme = () => {
		setColorTheme(prev => !prev)
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
						<img src={`${colorTheme === false ? 'Menu-dark_theme.svg' : 'Menu-light_theme.svg'}`} alt="" />
					) : (
						<img src={`${colorTheme === false ? 'Close_round-dark_theme.svg' : 'Close_round-light_theme.svg'}`} alt="" />
					)}

				</button>
			</div>
			<ul className='boards-list'>
				{boards.map((board, index) => (
					<Board
						key={index}
						setBoards={setBoards}
						newBoardInfo={board}
						closeSidebar={closeSidebar}
						currentBoard={currentBoard}
						setCurrentBoard={setCurrentBoard}
						colorTheme={colorTheme}
					/>
				))}
				<li className={`board-add-new ${closeSidebar ? 'change-display--close' : ''}`} onClick={handleShowNewBoard}>
					<img src={`${colorTheme === false ? 'Add_round_fill-dark_theme.svg' : 'Add_round_fill-light_theme.svg'}`} alt="" />

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
						<img src={`${colorTheme === false ? 'Moon_fill-dark_theme.svg' : 'Sun_fill-light_theme.svg'}`} alt="" />
					</button>
				) : (
					<>
						<button className={`theme-btn theme-btn--dark ${colorTheme === false ? 'theme-btn--active' : ''}`}>
							<img src={`${colorTheme === false ? 'Moon_fill-dark_theme.svg' : 'Moon_fill-light_theme.svg'}`} alt="" />

							Dark
						</button>
						<button className={`theme-btn theme-btn--light ${colorTheme === true ? 'theme-btn--active' : ''}`}>
							<img src={`${colorTheme === false ? 'Sun_fill-dark_theme.svg' : 'Sun_fill-light_theme.svg'}`} alt="" />

							Light
						</button>
					</>
				)}
			</div>
		</div>
	)
}