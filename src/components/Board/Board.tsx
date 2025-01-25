import '../Board/Board.css'
import { NewBoardInfo } from '../../types';

interface BoardProps {
	closeSidebar: boolean;
	newBoardInfo: NewBoardInfo;
}

export default function Board({ closeSidebar, newBoardInfo }: BoardProps) {
	return (
		<li className={`board-item ${closeSidebar ? 'board-item--close' : ''}`}>
			<img className='board-img' src={newBoardInfo.newBoardLogo} alt="Logo" />
			{closeSidebar ? (
				null
			) : (
				<p className='board-text'>{newBoardInfo.newBoardName}</p>
			)}
		</li>
	)
}