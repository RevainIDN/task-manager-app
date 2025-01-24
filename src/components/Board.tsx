import '../styles/Board.css'

interface BoardProps {
	closeSidebar: boolean;
}

export default function Board({ closeSidebar }: BoardProps) {
	return (
		<li className={`board-item ${closeSidebar ? 'board-item--close' : ''}`}>
			<img className='board-img' src="emojis/board-logo-01.png" alt="" />
			{closeSidebar ? (
				null
			) : (
				<p className='board-text'>Default Board</p>
			)}
		</li>
	)
}