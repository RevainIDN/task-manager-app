import { useState, SetStateAction } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { setRenderNewBoard } from '../../store/uiSlice';
import { NewBoardInfo } from '../../types';
import '../Sidebar/Sidebar.css'
import Board from '../Board/Board'

interface SidebarProps {
	colorTheme: boolean;
	setColorTheme: React.Dispatch<SetStateAction<boolean>>;
	updateBoardsInLocalStorage: (updatedBoards: NewBoardInfo[]) => void;
}

export default function Sidebar({ colorTheme, setColorTheme, updateBoardsInLocalStorage }: SidebarProps) {
	const dispatch = useDispatch<AppDispatch>();
	const boards = useSelector((state: RootState) => state.boards.boards);

	const [closeSidebar, setCloseSidebar] = useState<boolean>(false);

	const handleSwitchColorTheme = () => {
		setColorTheme(prev => !prev)
	}

	const handleCloseSidebar = () => {
		setCloseSidebar(prev => !prev)
	}

	const handleShowNewBoard = () => {
		if (boards.length >= 10) {
			return
		}
		dispatch(setRenderNewBoard(true))
	}

	return (
		<div className={`sidebar-boards ${closeSidebar ? 'sidebar-boards--close' : ''}`}>
			<div className='switch-sidebar-cont'>
				<button className='switch-sidebar' onClick={handleCloseSidebar}>
					{closeSidebar ? (
						<img src={`${colorTheme === false ? 'Menu-dark_theme.svg' : 'Menu-light_theme.svg'}`} alt="Menu" />
					) : (
						<img src={`${colorTheme === false ? 'Close_round-dark_theme.svg' : 'Close_round-light_theme.svg'}`} alt="Close" />
					)}

				</button>
			</div>
			<ul className={`boards-list ${closeSidebar ? 'boards-list--close' : ''}`}>
				{boards.map((board, index) => (
					<Board
						key={index}
						newBoardInfo={board}
						closeSidebar={closeSidebar}
						colorTheme={colorTheme}
						updateBoardsInLocalStorage={updateBoardsInLocalStorage}
					/>
				))}
				<li className={`board-add-new ${closeSidebar ? 'change-display--close' : ''}`} onClick={handleShowNewBoard}>
					<img src={`${colorTheme === false ? 'Add_round_fill-dark_theme.svg' : 'Add_round_fill-light_theme.svg'}`} alt="Add" />

					{closeSidebar ? (
						null
					) : (
						<p className='new-board-text'>{boards.length >= 10 ? 'Board limit reached' : 'Add new board'}</p>
					)}
				</li>
			</ul>
			<div className={`${closeSidebar ? 'switch-theme--close' : 'switch-theme'}`} onClick={handleSwitchColorTheme}>
				{closeSidebar ? (
					<button className='theme-btn--active'>
						<img src={`${colorTheme === false ? 'Moon_fill-dark_theme.svg' : 'Sun_fill-light_theme.svg'}`} alt="Dark/Light" />
					</button>
				) : (
					<>
						<button className={`theme-btn theme-btn--dark ${colorTheme === false ? 'theme-btn--active' : ''}`}>
							<img src={`${colorTheme === false ? 'Moon_fill-dark_theme.svg' : 'Moon_fill-light_theme.svg'}`} alt="Dark" />

							Dark
						</button>
						<button className={`theme-btn theme-btn--light ${colorTheme === true ? 'theme-btn--active' : ''}`}>
							<img src={`${colorTheme === false ? 'Sun_fill-dark_theme.svg' : 'Sun_fill-light_theme.svg'}`} alt="Light" />

							Light
						</button>
					</>
				)}
			</div>
		</div>
	)
}