import { SetStateAction } from 'react';
import './Overlay.css';

interface OverlayProps {
	setRenderNewBoard: React.Dispatch<SetStateAction<boolean>>;
	setRenderNewTask: React.Dispatch<SetStateAction<boolean>>;
	setEditMode: React.Dispatch<SetStateAction<boolean>>;
	setEditTaskId: React.Dispatch<SetStateAction<number | null>>;
}

export default function Overlay({ setRenderNewBoard, setRenderNewTask, setEditMode, setEditTaskId }: OverlayProps) {
	const handleClose = () => {
		setRenderNewBoard(false);
		setRenderNewTask(false);
		setEditMode(false);
		setEditTaskId(null);
	}

	return <div className="overlay" onClick={handleClose}></div>;
}