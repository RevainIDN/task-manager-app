import '../Task/Task.css';
import Tag from '../Tag/Tag';
import { BoardTasks } from '../../types';

interface TaskProps {
	task: BoardTasks;
}

export default function Task({ task }: TaskProps) {
	return (
		<li className='task-item'>
			{task.img === undefined ?
				(<img className='task-img' src={task.img || undefined} alt="" />) :
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