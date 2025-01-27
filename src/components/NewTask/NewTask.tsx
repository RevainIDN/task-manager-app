import { useState, SetStateAction } from 'react';
import '../NewTask/NewTask.css'

interface NewTaskProps {
	setRenderNewTask: React.Dispatch<SetStateAction<boolean>>;
	addTask: () => void;
}

export default function NewTask({ setRenderNewTask, addTask }: NewTaskProps) {
	const [dropDownListStatusSelected, setDropDownListStatusSelected] = useState<boolean>(false);
	const [dropDownListTagsSelected, setDropDownListTagsSelected] = useState<boolean>(false);

	const selectDropDownStatus = () => {
		setDropDownListStatusSelected(prev => !prev)
	}

	const selectDropDownTags = () => {
		setDropDownListTagsSelected(prev => !prev)
	}

	return (
		<div className='new-task'>
			<div className='task-title-cont'>
				<h1 className='task-name'>Task details</h1>
				<img className='task-close' src="Close_round-dark_theme.svg" alt="" onClick={() => setRenderNewTask(false)} />
			</div>
			<div className='task-img-cont'>
				<div className='task-img-btns'>
					<button className='task-img-btn task-img-btn-random'>Randome Cover</button>
					<button className='task-img-btn task-img-btn-remove'>Remove</button>
				</div>
				<img className='task-img' src="" alt="" />
			</div>
			<div className='dropdown-cont'>
				Status
				<div className='dropdown' onClick={selectDropDownStatus}>
					Backlog
					<ul className={`dropdown-list-status ${dropDownListStatusSelected ? 'dropdown-list--active' : ''}`}>
						<li className='dropdown-item-status'><span className='task-point task-point--blue'></span><p>Backlog</p></li>
						<li className='dropdown-item-status'><span className='task-point task-point--yellow'></span><p>In Progress</p></li>
						<li className='dropdown-item-status'><span className='task-point task-point--purple'></span><p>In Review</p></li>
						<li className='dropdown-item-status'><span className='task-point task-point--green'></span><p>Completed</p></li>
					</ul>
				</div>
			</div>
			<div className='dropdown-cont'>
				Tags
				<div className='dropdown' onClick={selectDropDownTags}>
					Concept
					<ul className={`dropdown-list-tags ${dropDownListTagsSelected ? 'dropdown-list--active' : ''}`}>
						<li className='dropdown-item-tags dropdown-item-tags--red'>Concept</li>
						<li className='dropdown-item-tags dropdown-item-tags--blue'>Technical</li>
						<li className='dropdown-item-tags dropdown-item-tags--yellow'>Design</li>
						<li className='dropdown-item-tags dropdown-item-tags--green'>Front-end</li>
					</ul>
				</div>
			</div>
			<label className='task-label'>
				Task name
				<input className='task-input' type="text" placeholder='e.g: Default Task' />
			</label>
			<div className='task-btns'>
				<button className='task-btn task-btn-create'>Save<img src="Done_round.svg" alt="" /></button>
				<button className='task-btn task-btn-cancel' onClick={() => setRenderNewTask(false)}>Cancel</button>
			</div>
		</div>
	)
}