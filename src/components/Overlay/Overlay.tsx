import './Overlay.css';
import { SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { setEditTaskId } from '../../store/boardsSlice';
import { setEditMode } from '../../store/uiSlice';

interface OverlayProps {
	setRenderNewBoard: React.Dispatch<SetStateAction<boolean>>;
	setRenderNewTask: React.Dispatch<SetStateAction<boolean>>;
}

export default function Overlay({ setRenderNewBoard, setRenderNewTask }: OverlayProps) {
	const dispatch = useDispatch<AppDispatch>()

	const handleClose = () => {
		setRenderNewBoard(false);
		setRenderNewTask(false);
		dispatch(setEditMode(false));
		dispatch(setEditTaskId(null));
	}

	return <div className="overlay" onClick={handleClose}></div>;
}