import '../styles/TaskBoard.css'
import Task from './Task'

export default function TaskBoard() {
	return (
		<div className='task-board'>
			<ul className='task-list'>
				<li className='task-title'>
					<span className='task-point task-point--blue'></span>
					<h1 className='task-text'>Backlog</h1>
				</li>
				<Task />
				<li className='task-add-new'>
					<p className='task-text'>Add new task card</p>
					<img className='task-img' src="Add_round.svg" alt="" />
				</li>
			</ul>
			<ul className='task-list'>
				<li className='task-title'>
					<span className='task-point task-point--yellow'></span>
					<h1 className='task-text'>In Progress</h1>
				</li>
			</ul>
			<ul className='task-list'>
				<li className='task-title'>
					<span className='task-point task-point--purple'></span>
					<h1 className='task-text'>In Review</h1>
				</li>
			</ul>
			<ul className='task-list'>
				<li className='task-title'>
					<span className='task-point task-point--green'></span>
					<h1 className='task-text'>Completed</h1>
				</li>
			</ul>
		</div>
	)
}