import { useState, useEffect, SetStateAction } from 'react';
import { NewBoardInfo } from '../../types';
import '../NewBoard/NewBoard.css'
import logos from '../../assets/logos';

interface NewBoard {
	editMode: boolean;
	setEditMode: React.Dispatch<SetStateAction<boolean>>;
	selectedBoardId: number;
	boards: NewBoardInfo[];
	setRenderNewBoard: React.Dispatch<SetStateAction<boolean>>;
	addBoard: (newBoardInfo: NewBoardInfo) => void;
	updateBoard: (updatedBoard: NewBoardInfo) => void;
}

const handleClose = (
	setRenderNewBoard: React.Dispatch<SetStateAction<boolean>>,
	setEditMode: React.Dispatch<SetStateAction<boolean>>
) => {
	setRenderNewBoard(false);
	setEditMode(false);
};

const saveNewBoardName = (
	e: React.ChangeEvent<HTMLInputElement>,
	setNewBoardInfo: React.Dispatch<SetStateAction<NewBoardInfo>>
) => {
	const value = e.currentTarget.value;
	setNewBoardInfo(prevState => ({
		...prevState,
		newBoardName: value
	}));
};

const saveNewBoardLogo = (
	logo: string,
	setNewBoardInfo: React.Dispatch<SetStateAction<NewBoardInfo>>
) => {
	setNewBoardInfo(prevState => ({
		...prevState,
		newBoardLogo: logo
	}));
};

const handleCreateBoard = (
	newBoardInfo: NewBoardInfo,
	editMode: boolean,
	addBoard: (newBoardInfo: NewBoardInfo) => void,
	updateBoard: (updatedBoard: NewBoardInfo) => void
) => {
	if (newBoardInfo.newBoardName === '' || newBoardInfo.newBoardLogo === '') {
		return;
	}

	editMode ? updateBoard(newBoardInfo) : addBoard(newBoardInfo);
};

export default function NewBoard({ editMode, setEditMode, selectedBoardId, boards, setRenderNewBoard, addBoard, updateBoard }: NewBoard) {
	const [logoList, setLogoList] = useState<string[]>([]);
	const [newBoardInfo, setNewBoardInfo] = useState<NewBoardInfo>(() => {
		const editableBoard = boards.find(board => board.id === selectedBoardId);
		return editMode && editableBoard ? editableBoard : ({
			id: 0,
			newBoardName: '',
			newBoardLogo: '',
			tasks: [{
				id: 1,
				img: '',
				title: 'Default Task',
				tags: [{
					tag: 'Concept',
					color: 'red',
				}],
				status: 'Backlog',
			}],
		})
	});

	useEffect(() => {
		setLogoList(logos);
	}, []);

	return (
		<div className='new-board'>
			<div className='board-title-cont'>
				<h1 className='board-name'>New Board</h1>
				<img
					className='board-close'
					src="Close_round-dark_theme.svg"
					alt="Close"
					onClick={() => handleClose(setRenderNewBoard, setEditMode)}
				/>
			</div>
			<label className='board-label'>
				Board name
				<input
					className='board-input'
					type="text"
					placeholder='e.g: Default Board'
					value={newBoardInfo.newBoardName}
					onChange={(e) => saveNewBoardName(e, setNewBoardInfo)} />
			</label>
			<div className='board-logos'>
				<p className='board-logo-title'>Logo</p>
				<ul className='board-logo-list'>
					{logos ? (
						logoList.map((logo, index) => (
							<li
								key={index}
								className={`board-logo-item ${logo === newBoardInfo.newBoardLogo ? 'board-logo-item--active' : ''}`}
								onClick={() => saveNewBoardLogo(logo, setNewBoardInfo)}>
								<img src={logo}
									alt={`Logo ${index + 1}`} />
							</li>
						))
					) : (
						null
					)}
				</ul>
			</div>
			<div className='board-btns'>
				<button
					className='board-btn board-btn-create'
					onClick={() => handleCreateBoard(newBoardInfo, editMode, addBoard, updateBoard)}
				>
					{editMode ? 'Save board' : 'Create board'}<img src="Done_round.svg" alt="Done" />
				</button>
				<button
					className='board-btn board-btn-cancel'
					onClick={() => handleClose(setRenderNewBoard, setEditMode)}
				>
					Cancel
				</button>
			</div>
		</div>
	)
}