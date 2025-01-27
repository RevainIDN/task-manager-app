import { useState, SetStateAction } from 'react';
import { BoardTasks } from '../../types';
import '../NewTask/NewTask.css'
import Tag from '../Tag/Tag';

interface NewTaskProps {
	setRenderNewTask: React.Dispatch<SetStateAction<boolean>>;
	addTask: () => void;
}

export default function NewTask({ setRenderNewTask, addTask }: NewTaskProps) {
	const [dropDownListStatusSelected, setDropDownListStatusSelected] = useState<boolean>(false);
	const [dropDownListTagsSelected, setDropDownListTagsSelected] = useState<boolean>(false);
	const [statusPoint, setStatusPoint] = useState<string>('blue');

	const [newTaskInfo, setNewTaskInfo] = useState<BoardTasks>({
		id: 0,
		img: '',
		title: 'Default Task',
		tags: [{ tag: 'Concept', color: 'red' }],
		status: 'Backlog',
	});

	const selectDropDownStatus = () => {
		if (dropDownListTagsSelected) setDropDownListTagsSelected(false);
		setDropDownListStatusSelected(prev => !prev)
	}

	const selectDropDownTags = () => {
		if (dropDownListStatusSelected) setDropDownListStatusSelected(false);
		setDropDownListTagsSelected(prev => !prev)
	}

	const saveNewTaskStatus = (e: React.MouseEvent<HTMLElement>) => {
		const value = e.currentTarget.textContent;
		const valuePoint = e.currentTarget.getAttribute('data-point');
		setStatusPoint(valuePoint || '');
		setNewTaskInfo(prevState => ({
			...prevState,
			status: value || "",
		}));
	}

	const saveNewTaskTag = (e: React.MouseEvent<HTMLElement>) => {
		const value = e.currentTarget.textContent || '';
		const color = e.currentTarget.getAttribute('data-color') || '';

		setNewTaskInfo(prevState => {
			let updatedTags = [...prevState.tags];

			const existingTagIndex = updatedTags.findIndex(tagInfo => tagInfo.tag === value);

			if (existingTagIndex !== -1) {
				if (updatedTags.length > 1) {
					updatedTags.splice(existingTagIndex, 1);
				}
			} else if (updatedTags.length < 4) {
				updatedTags.push({ tag: value, color });
			}

			return {
				...prevState,
				tags: updatedTags
			};
		});
	};

	const saveNewTaskName = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value;
		setNewTaskInfo(prevState => ({
			...prevState,
			title: value || "",
		}))
	}

	// const handleCreateTask = () => {
	// 	if (newTaskInfo.newBoardName === '' || newBoardInfo.newBoardLogo === '') {
	// 		return
	// 	}

	// 	addTask(newTaskInfo);
	// }

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
					<div className={`task-point task-point--${statusPoint}`}></div><p>{newTaskInfo.status}</p>
					<ul className={`dropdown-list-status ${dropDownListStatusSelected ? 'dropdown-list--active' : ''}`}>
						<li className='dropdown-item-status' data-point='blue' onClick={saveNewTaskStatus}>
							<span className='task-point task-point--blue'></span><p>Backlog</p>
						</li>
						<li className='dropdown-item-status' data-point='yellow' onClick={saveNewTaskStatus}>
							<span className='task-point task-point--yellow'></span><p>In Progress</p>
						</li>
						<li className='dropdown-item-status' data-point='purple' onClick={saveNewTaskStatus}>
							<span className='task-point task-point--purple'></span><p>In Review</p>
						</li>
						<li className='dropdown-item-status' data-point='green' onClick={saveNewTaskStatus}>
							<span className='task-point task-point--green'></span><p>Completed</p>
						</li>
					</ul>
				</div>
			</div>
			<div className='dropdown-cont'>
				Tags
				<div className='dropdown' onClick={selectDropDownTags}>
					<ul className='task-tags'>
						{newTaskInfo.tags ? (
							newTaskInfo.tags.map((tagInfo, index) => (
								<Tag key={index} tagInfo={tagInfo} />
							))
						) : (
							null
						)}
					</ul>
					<ul className={`dropdown-list-tags ${dropDownListTagsSelected ? 'dropdown-list--active' : ''}`}>
						<li className='dropdown-item-tags dropdown-item-tags--red' data-color='red' onClick={saveNewTaskTag}>Concept</li>
						<li className='dropdown-item-tags dropdown-item-tags--blue' data-color='blue' onClick={saveNewTaskTag}>Technical</li>
						<li className='dropdown-item-tags dropdown-item-tags--yellow' data-color='yellow' onClick={saveNewTaskTag}>Design</li>
						<li className='dropdown-item-tags dropdown-item-tags--green' data-color='green' onClick={saveNewTaskTag}>Front-end</li>
					</ul>
				</div>
			</div>
			<label className='task-label'>
				Task name
				<input className='task-input' type="text" placeholder='e.g: Default Task' onChange={saveNewTaskName} />
			</label>
			<div className='task-btns'>
				<button className='task-btn task-btn-create'>Save<img src="Done_round.svg" alt="" /></button>
				<button className='task-btn task-btn-cancel' onClick={() => setRenderNewTask(false)}>Cancel</button>
			</div>
		</div>
	)
}