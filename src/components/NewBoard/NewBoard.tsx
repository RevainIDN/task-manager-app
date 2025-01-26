import { useState, useEffect, SetStateAction } from 'react';
import { NewBoardInfo } from '../../types';
import '../NewBoard/NewBoard.css'
import logos from '../../assets/logos';

interface NewBoard {
	setRenderNewBoard: React.Dispatch<SetStateAction<boolean>>;
	addBoard: (newBoardInfo: NewBoardInfo) => void;
}

export default function NewBoard({ setRenderNewBoard, addBoard }: NewBoard) {
	const [logoList, setLogoList] = useState<string[]>([]);
	const [newBoardInfo, setNewBoardInfo] = useState<NewBoardInfo>({
		newBoardName: '',
		newBoardLogo: '',
	});

	useEffect(() => {
		setLogoList(logos);
	}, []);

	const handleCancelNewBoard = () => {
		setRenderNewBoard(false);
	}

	const saveNewBoardName = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value;
		setNewBoardInfo(prevState => ({
			...prevState,
			newBoardName: value
		}))
	}

	const saveNewBoardLogo = (logo: string) => {
		setNewBoardInfo(prevState => ({
			...prevState,
			newBoardLogo: logo
		}))
	}

	const handleCreateBoard = () => {
		if (newBoardInfo.newBoardName === '' || newBoardInfo.newBoardLogo === '') {
			return
		}

		addBoard(newBoardInfo);
	}

	return (
		<div className='new-board'>
			<div className='board-title-cont'>
				<h1 className='board-title'>New Board</h1>
				<img className='board-close' src="Close_round-dark_theme.svg" alt="" onClick={handleCancelNewBoard} />
			</div>
			<label className='board-label'>
				Board name
				<input className='board-input' type="text" placeholder='e.g: Default Board' onChange={saveNewBoardName} />
			</label>
			<div className='board-logos'>
				<p className='board-logo-title'>Logo</p>
				<ul className='board-logo-list'>
					{logos ? (
						logoList.map((logo, index) => (
							<li key={index} className={`board-logo-item ${logo === newBoardInfo.newBoardLogo ? 'board-logo-item--active' : ''}`} onClick={() => saveNewBoardLogo(logo)}>
								<img src={logo} alt={`Logo ${index + 1}`} />
							</li>
						))
					) : (
						null
					)}
				</ul>
			</div>
			<div className='board-btns'>
				<button className='board-btn board-btn-create' onClick={handleCreateBoard}>Create board <img src="Done_round.svg" alt="" /></button>
				<button className='board-btn board-btn-cancel' onClick={handleCancelNewBoard}>Cancel</button>
			</div>
		</div>
	)
}