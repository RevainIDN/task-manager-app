import '../Board/Board.css'
import { NewBoardInfo } from '../../types';
import { useState, SetStateAction } from 'react';

interface BoardProps {
	closeSidebar: boolean;
	newBoardInfo: NewBoardInfo;
	currentBoard: number;
	setCurrentBoard: React.Dispatch<SetStateAction<number>>;
}

export default function Board({ closeSidebar, newBoardInfo, currentBoard, setCurrentBoard }: BoardProps) {
	const handleBoard = () => {
		setCurrentBoard(newBoardInfo.id);
	};

	return (
		<li
			className={`board-item ${closeSidebar ? 'board-item--close' : ''} ${currentBoard === newBoardInfo.id ? 'board-item--active' : ''}`}
			onClick={handleBoard}
		>
			<img className='board-img' src={newBoardInfo.newBoardLogo} alt="Logo" />
			{closeSidebar ? null : <p className='board-text'>{newBoardInfo.newBoardName}</p>}
		</li>
	);
}