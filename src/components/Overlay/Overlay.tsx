import { SetStateAction } from 'react';
import './Overlay.css';

interface OverlayProps {
	setRenderNewBoard: React.Dispatch<SetStateAction<boolean>>;
	setEditBoard: React.Dispatch<SetStateAction<boolean>>;
}

export default function Overlay({ setRenderNewBoard, setEditBoard }: OverlayProps) {
	const handleClose = () => {
		setRenderNewBoard(false);
		setEditBoard(false);
	}

	return <div className="overlay" onClick={handleClose}></div>;
}