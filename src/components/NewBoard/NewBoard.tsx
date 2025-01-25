import '../NewBoard/NewBoard.css'
import { useState, useEffect, SetStateAction } from 'react';
import logos from '../../assets/logos';

interface NewBoard {
	setCreateNewBoard: React.Dispatch<SetStateAction<boolean>>;
}

export default function NewBoard({ setCreateNewBoard }: NewBoard) {
	const [logoList, setLogoList] = useState<string[]>([]);

	useEffect(() => {
		setLogoList(logos);
	}, []);

	const handleCancelNewBoard = () => {
		setCreateNewBoard(false);
	}

	return (
		<div className='new-board'>
			<div className='board-title-cont'>
				<h1 className='board-title'>New Board</h1>
				<img className='board-close' src="Close_round-dark_theme.svg" alt="" onClick={handleCancelNewBoard} />
			</div>
			<label className='board-label'>
				Board name
				<input className='board-input' type="text" placeholder='e.g: Default Board' />
			</label>
			<div className='board-logos'>
				<p className='board-logo-title'>Logo</p>
				<ul className='board-logo-list'>
					{logos ? (
						logoList.map((logo, index) => (
							<li key={index} className='board-logo-item'>
								<img src={logo} alt={`Logo ${index + 1}`} />
							</li>
						))
					) : (
						null
					)}
				</ul>
			</div>
			<div className='board-btns'>
				<button className='board-btn board-btn-create'>Create board <img src="Done_round.svg" alt="" /></button>
				<button className='board-btn board-btn-cancel' onClick={handleCancelNewBoard}>Cancel</button>
			</div>
		</div>
	)
}