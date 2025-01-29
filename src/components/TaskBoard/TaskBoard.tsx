import '../TaskBoard/TaskBoard.css';
import { SetStateAction } from 'react';
import { useTaskBoard } from '../../hooks/useTaskBoard';
import { NewBoardInfo } from '../../types';
import Task from '../Task/Task';

interface TaskBoardProps {
	currentBoard: number;
	boards: NewBoardInfo[];
	setRenderNewTask: React.Dispatch<SetStateAction<boolean>>;
	setEditBoard: React.Dispatch<SetStateAction<boolean>>;
	setEditTaskId: React.Dispatch<SetStateAction<number | null>>;
}

export default function TaskBoard({ currentBoard, boards, setRenderNewTask, setEditBoard, setEditTaskId }: TaskBoardProps) {
	const { handleShowNewTask, renderTasks, renderTasksLength } = useTaskBoard({
		currentBoard,
		boards,
		setRenderNewTask,
		setEditBoard,
		setEditTaskId,
	});

	return (
		<div className='task-board'>
			<ul className='task-list'>
				<li className='task-title'>
					<span className='task-point task-point--blue'></span>
					<h1 className='task-text'>Backlog ({renderTasksLength('Backlog')})</h1>
				</li>
				{renderTasks('Backlog').map(task => (
					<Task
						key={task.id}
						task={task}
						setRenderNewTask={setRenderNewTask}
						setEditBoard={setEditBoard}
						setEditTaskId={setEditTaskId}
					/>
				))}
				<li className='task-add-new' onClick={handleShowNewTask}>
					<p className='task-text'>Add new task card</p>
					<img className='task-board-img' src="Add_round.svg" alt="Add new task" />
				</li>
			</ul>
			<ul className='task-list'>
				<li className='task-title'>
					<span className='task-point task-point--yellow'></span>
					<h1 className='task-text'>In Progress ({renderTasksLength('In Progress')})</h1>
				</li>
				{renderTasks('In Progress').map(task => (
					<Task
						key={task.id}
						task={task}
						setRenderNewTask={setRenderNewTask}
						setEditBoard={setEditBoard}
						setEditTaskId={setEditTaskId}
					/>
				))}
			</ul>
			<ul className='task-list'>
				<li className='task-title'>
					<span className='task-point task-point--purple'></span>
					<h1 className='task-text'>In Review ({renderTasksLength('In Review')})</h1>
				</li>
				{renderTasks('In Review').map(task => (
					<Task
						key={task.id}
						task={task}
						setRenderNewTask={setRenderNewTask}
						setEditBoard={setEditBoard}
						setEditTaskId={setEditTaskId}
					/>
				))}
			</ul>
			<ul className='task-list'>
				<li className='task-title'>
					<span className='task-point task-point--green'></span>
					<h1 className='task-text'>Completed ({renderTasksLength('Completed')})</h1>
				</li>
				{renderTasks('Completed').map(task => (
					<Task
						key={task.id}
						task={task}
						setRenderNewTask={setRenderNewTask}
						setEditBoard={setEditBoard}
						setEditTaskId={setEditTaskId}
					/>
				))}
			</ul>
		</div>
	);
}