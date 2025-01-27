import '../Task/Task.css';
import Tag from '../Tag/Tag';
import { BoardTasks } from '../../types';

interface TaskProps {
	task: BoardTasks;
}

export default function Task({ task }: TaskProps) {
	return (
		<li className='task-item'>
			{task.img ?
				(<div className='task-img-cont'>
					<img className='task-img' src={task.img || undefined} alt="" />
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