import './Overlay.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { setEditTaskId } from '../../store/boardsSlice';
import { setEditMode, setRenderNewBoard, setRenderNewTask } from '../../store/uiSlice';

export default function Overlay() {
	const dispatch = useDispatch<AppDispatch>()

	const handleClose = () => {
		dispatch(setRenderNewBoard(false))
		dispatch(setRenderNewTask(false))
		dispatch(setEditMode(false));
		dispatch(setEditTaskId(null));
	}

	return <div className="overlay" onClick={handleClose}></div>;
}