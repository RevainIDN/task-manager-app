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
}

export default function Board({ closeSidebar, setBoards, newBoardInfo, currentBoard, setCurrentBoard, colorTheme }: BoardProps) {
	const [renderNotice, setRenderNotice] = useState<boolean>(false);

	const handleBoard = () => {
		setCurrentBoard(newBoardInfo.id);
	};

	const handleDelete = () => {
		setRenderNotice(prev => !prev);
	}

	useEffect(() => {
		setRenderNotice(false);
	}, [closeSidebar])

	const handleConfirmDelete = () => {
		setBoards(prevBoards => prevBoards.filter(board => board.id !== newBoardInfo.id));
		setRenderNotice(false);
	};

	return (
		<li
			className={`board-item ${closeSidebar ? 'board-item--close' : ''} ${currentBoard === newBoardInfo.id ? 'board-item--active' : ''}`}
			onClick={handleBoard}
		>
			<img className='board-img' src={newBoardInfo.newBoardLogo} alt="Logo" />
			{closeSidebar ? null :
				<>
					<p className='board-text'>{newBoardInfo.newBoardName}</p>
					<img className='board-edit' src={`${colorTheme === false ? 'Pencil-dark_theme.svg' : 'Pencil-ligth_theme.svg'}`} alt='Edit' />
					<img className='board-trash' src={`${colorTheme === false ? 'Trash_icon-dark_theme.svg' : 'Trash_icon-light_theme.svg'}`} alt='Delete' onClick={handleDelete} />
				</>
			}
			{renderNotice ? (
				<div className='board-notice'>
					<p className='notice-title'>Delete board?</p>
					<div className='notice-btns'>
						<button className='notice-btn' onClick={handleConfirmDelete}>Yes</button>
						<button className='notice-btn' onClick={() => setRenderNotice(false)}>No</button>
					</div>
				</div>
			) : (
				null
			)}
		</li>
	);
}