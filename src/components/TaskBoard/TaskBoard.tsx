import '../TaskBoard/TaskBoard.css';
import { useTaskBoard } from '../../hooks/useTaskBoard';
import { useDrop } from 'react-dnd';
import Task from '../Task/Task';

export default function TaskBoard() {
	const { handleShowNewTask, renderTasks, renderTasksLength, moveTask } = useTaskBoard();

	const TaskColumn = ({ status }: { status: string }) => {
		const [{ isOver }, drop] = useDrop({
			accept: 'TASK',
			drop: (item: { id: number }) => moveTask(item.id, status),
			collect: monitor => ({
				isOver: !!monitor.isOver(),
			}),
		});

		return (
			<ul ref={drop} className={`task-list ${isOver ? 'highlight' : ''}`}>
				<li className='task-title'>
					<span className={`task-point task-point--${status.replace(' ', '-').toLowerCase()}`}></span>
					<h1 className='task-text'>{status} ({renderTasksLength(status)})</h1>
				</li>
				{renderTasks(status).map(task => (
					<Task
						key={task.id}
						task={task}
					/>
				))}
				{status === 'Backlog' && (
					<li className='task-add-new' onClick={handleShowNewTask}>
						<p className='task-text'>Add new task card</p>
						<img className='task-board-img' src="Add_round.svg" alt="Add new task" />
					</li>
				)}
			</ul>
		);
	};

	return (
		<div className='task-board'>
			{['Backlog', 'In Progress', 'In Review', 'Completed'].map(status => (
				<TaskColumn key={status} status={status} />
			))}
		</div>
	);
}