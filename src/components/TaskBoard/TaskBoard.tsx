import '../TaskBoard/TaskBoard.css'
import { SetStateAction } from 'react';
import Task from '../Task/Task'
import { NewBoardInfo, BoardTasks } from '../../types';

interface TaskBoardProps {
	currentBoard: number;
	boards: NewBoardInfo[];
	setRenderNewTask: React.Dispatch<SetStateAction<boolean>>;
	setEditBoard: React.Dispatch<SetStateAction<boolean>>;
	setEditTaskId: React.Dispatch<SetStateAction<number | null>>;
}

export default function TaskBoard({ currentBoard, boards, setRenderNewTask, setEditBoard, setEditTaskId }: TaskBoardProps) {
	const handleShowNewTask = () => {
		setEditTaskId(null);
		setEditBoard(false);
		setRenderNewTask(true);
	}

	const currentBoardTasks: BoardTasks[] = boards.find(board => board.id === currentBoard)?.tasks || [];

	const renderTasks = (status: string) => {
		return currentBoardTasks
			.filter(task => task.status === status)
			.map((task, index) => (
				<Task
					key={index}
					task={task}
					setRenderNewTask={setRenderNewTask}
					setEditBoard={setEditBoard}
					setEditTaskId={setEditTaskId}
				/>
			));
	};

	const renderTasksLength = (status: string) => {
		const statusTasks = currentBoardTasks
			.filter(task => task.status === status)
		return statusTasks.length;
	}

	return (
		<div className='task-board'>
			<ul className='task-list'>
				<li className='task-title'>
					<span className='task-point task-point--blue'></span>
					<h1 className='task-text'>Backlog ({renderTasksLength('Backlog')})</h1>
				</li>
				{renderTasks('Backlog')}
				<li className='task-add-new' onClick={handleShowNewTask}>
					<p className='task-text'>Add new task card</p>
					<img className='task-board-img' src="Add_round.svg" alt="" />
				</li>
			</ul>
			<ul className='task-list'>
				<li className='task-title'>
					<span className='task-point task-point--yellow'></span>
					<h1 className='task-text'>In Progress ({renderTasksLength('In Progress')})</h1>
				</li>
				{renderTasks('In Progress')}
			</ul>
			<ul className='task-list'>
				<li className='task-title'>
					<span className='task-point task-point--purple'></span>
					<h1 className='task-text'>In Review ({renderTasksLength('In Review')})</h1>
				</li>
				{renderTasks('In Review')}
			</ul>
			<ul className='task-list'>
				<li className='task-title'>
					<span className='task-point task-point--green'></span>
					<h1 className='task-text'>Completed ({renderTasksLength('Completed')})</h1>
				</li>
				{renderTasks('Completed')}
			</ul>
		</div>
	)
}