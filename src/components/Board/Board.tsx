import '../Board/Board.css'
import { NewBoardInfo } from '../../types';
import { useState, useEffect, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { setBoards, setSelectedBoardId } from '../../store/boardsSlice';
import { setEditMode } from '../../store/uiSlice';

interface BoardProps {
	closeSidebar: boolean;
	newBoardInfo: NewBoardInfo;
	colorTheme: boolean;
	setRenderNewBoard: React.Dispatch<SetStateAction<boolean>>
	updateBoardsInLocalStorage: (updatedBoards: NewBoardInfo[]) => void;
}

const handleSelectBoard = (dispatch: AppDispatch, boardId: number) => {
	dispatch(setSelectedBoardId(boardId))
	setSelectedBoardId(boardId);
};

const handleDeleteBoard = (setRenderNotice: React.Dispatch<SetStateAction<boolean>>) => {
	setRenderNotice(prev => !prev);
};

const handleConfirmDeleteBoard = (
	dispatch: AppDispatch,
	setRenderNotice: React.Dispatch<SetStateAction<boolean>>,
	boardId: number,
	boards: NewBoardInfo[],
	updateBoardsInLocalStorage: (updatedBoards: NewBoardInfo[]) => void,
) => {
	dispatch(setBoards(boards.filter((board: NewBoardInfo) => board.id !== boardId)));
	setRenderNotice(false);
	updateBoardsInLocalStorage(boards.filter((board: NewBoardInfo) => board.id !== boardId))
};

const handleEditBoard = (
	dispatch: AppDispatch,
	setRenderNewBoard: React.Dispatch<SetStateAction<boolean>>
) => {
	dispatch(setEditMode(true))
	setRenderNewBoard(true);
};

export default function Board({ closeSidebar, newBoardInfo, colorTheme, setRenderNewBoard, updateBoardsInLocalStorage }: BoardProps) {
	const dispatch = useDispatch<AppDispatch>();
	const { boards, selectedBoardId } = useSelector((state: RootState) => state.boards);
	const [renderNotice, setRenderNotice] = useState<boolean>(false);

	useEffect(() => {
		setRenderNotice(false);
	}, [closeSidebar])

	return (
		<li
			className={`board-item ${closeSidebar ? 'board-item--close' : ''} ${selectedBoardId === newBoardInfo.id ? 'board-item--active' : ''}`}
			onClick={() => handleSelectBoard(dispatch, newBoardInfo.id)}
		>
			<img className='board-img' src={newBoardInfo.newBoardLogo} alt="Logo" />
			{closeSidebar ? null :
				<>
					<p className='board-text'>{newBoardInfo.newBoardName}</p>
					<img
						className='board-edit'
						src={`${colorTheme === false ? 'Pencil-dark_theme.svg' : 'Pencil-ligth_theme.svg'}`}
						alt='Edit'
						onClick={() => handleEditBoard(dispatch, setRenderNewBoard)} />
					<img
						className='board-trash'
						src={`${colorTheme === false ? 'Trash_icon-dark_theme.svg' : 'Trash_icon-light_theme.svg'}`}
						alt='Delete'
						onClick={() => handleDeleteBoard(setRenderNotice)} />
				</>
			}
			{renderNotice ? (
				<div className='board-notice'>
					<p className='notice-title'>Delete board?</p>
					<div className='notice-btns'>
						<button
							className='notice-btn'
							onClick={() => handleConfirmDeleteBoard(dispatch, setRenderNotice, newBoardInfo.id, boards, updateBoardsInLocalStorage)}
						>
							Yes
						</button>
						<button
							className='notice-btn'
							onClick={() => setRenderNotice(false)}
						>
							No
						</button>
					</div>
				</div>
			) : (
				null
			)}
		</li>
	);
}