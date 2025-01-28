import '../Board/Board.css'
import { NewBoardInfo } from '../../types';
import { useState, useEffect, SetStateAction } from 'react';

interface BoardProps {
	closeSidebar: boolean;
	setBoards: React.Dispatch<SetStateAction<NewBoardInfo[]>>;
	newBoardInfo: NewBoardInfo;
	currentBoard: number;
	setCurrentBoard: React.Dispatch<SetStateAction<number>>;
	colorTheme: boolean;
	setEditBoard: React.Dispatch<SetStateAction<boolean>>
	setRenderNewBoard: React.Dispatch<SetStateAction<boolean>>
}

export default function Board({ closeSidebar, setBoards, newBoardInfo, currentBoard, setCurrentBoard, colorTheme, setEditBoard, setRenderNewBoard }: BoardProps) {
	const [renderNotice, setRenderNotice] = useState<boolean>(false);

	const handleSelectBoard = () => {
		setCurrentBoard(newBoardInfo.id);
	};

	const handleDeleteBoard = () => {
		setRenderNotice(prev => !prev);
	}

	const handleConfirmDeleteBoard = () => {
		setBoards(prevBoards => prevBoards.filter(board => board.id !== newBoardInfo.id));
		setRenderNotice(false);
	};

	const handleEditBoard = () => {
		setEditBoard(true)
		setRenderNewBoard(true);
	}

	useEffect(() => {
		setRenderNotice(false);
	}, [closeSidebar])

	return (
		<li
			className={`board-item ${closeSidebar ? 'board-item--close' : ''} ${currentBoard === newBoardInfo.id ? 'board-item--active' : ''}`}
			onClick={handleSelectBoard}
		>
			<img className='board-img' src={newBoardInfo.newBoardLogo} alt="Logo" />
			{closeSidebar ? null :
				<>
					<p className='board-text'>{newBoardInfo.newBoardName}</p>
					<img
						className='board-edit'
						src={`${colorTheme === false ? 'Pencil-dark_theme.svg' : 'Pencil-ligth_theme.svg'}`}
						alt='Edit'
						onClick={handleEditBoard} />
					<img
						className='board-trash'
						src={`${colorTheme === false ? 'Trash_icon-dark_theme.svg' : 'Trash_icon-light_theme.svg'}`}
						alt='Delete'
						onClick={handleDeleteBoard} />
				</>
			}
			{renderNotice ? (
				<div className='board-notice'>
					<p className='notice-title'>Delete board?</p>
					<div className='notice-btns'>
						<button className='notice-btn' onClick={handleConfirmDeleteBoard}>Yes</button>
						<button className='notice-btn' onClick={() => setRenderNotice(false)}>No</button>
					</div>
				</div>
			) : (
				null
			)}
		</li>
	);
}