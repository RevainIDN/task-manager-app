import { SetStateAction } from 'react';
import './Overlay.css';

interface OverlayProps {
	setRenderNewBoard: React.Dispatch<SetStateAction<boolean>>;
	setRenderNewTask: React.Dispatch<SetStateAction<boolean>>;
	setEditBoard: React.Dispatch<SetStateAction<boolean>>;
	setEditTaskId: React.Dispatch<SetStateAction<number | null>>;
}

export default function Overlay({ setRenderNewBoard, setRenderNewTask, setEditBoard, setEditTaskId }: OverlayProps) {
	const handleClose = () => {
		setRenderNewBoard(false);
		setRenderNewTask(false);
		setEditBoard(false);
		setEditTaskId(null);
	}

	return <div className="overlay" onClick={handleClose}></div>;
}