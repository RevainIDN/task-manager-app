import '../Task/Task.css';
import Tag from '../Tag/Tag';
import { BoardTasks } from '../../types';
import { SetStateAction } from 'react';
import { useDrag } from 'react-dnd';


interface TaskProps {
	task: BoardTasks;
	setRenderNewTask: React.Dispatch<SetStateAction<boolean>>;
	setEditMode: React.Dispatch<SetStateAction<boolean>>;
	setEditTaskId: React.Dispatch<SetStateAction<number | null>>;
}

export default function Task({ task, setRenderNewTask, setEditMode, setEditTaskId }: TaskProps) {
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
		setEditTaskId(task.id);
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