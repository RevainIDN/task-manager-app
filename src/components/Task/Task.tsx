import '../Task/Task.css';
import { BoardTasks } from '../../types';
import { SetStateAction } from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { setEditTaskId } from '../../store/boardsSlice';
import Tag from '../Tag/Tag';


interface TaskProps {
	task: BoardTasks;
	setRenderNewTask: React.Dispatch<SetStateAction<boolean>>;
	setEditMode: React.Dispatch<SetStateAction<boolean>>;
}

export default function Task({ task, setRenderNewTask, setEditMode }: TaskProps) {
	const dispatch = useDispatch<AppDispatch>()

	const [{ isDragging }, drag] = useDrag({
		type: 'TASK',
		item: { id: task.id, status: task.status },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	});

	const handleEditTask = () => {
		setEditMode(true)
		setRenderNewTask(true);
		dispatch(setEditTaskId(task.id))
	}

	return (
		<li ref={drag} className={`task-item ${isDragging ? 'dragging' : ''}`} onClick={handleEditTask}>
			{task.img ?
				(<div className='task-img-cont'>
					<img className='task-img' src={task.img || undefined} alt="Random Image" />
				</div>) :
				null
			}
			<p className='task-text'>{task.title}</p>
			<ul className='task-tags'>
				{task.tags ? (
					task.tags.map((tagInfo, index) => (
						<Tag key={index} tagInfo={tagInfo} />
					))
				) : (
					null
				)}
			</ul>
		</li>
	);
}