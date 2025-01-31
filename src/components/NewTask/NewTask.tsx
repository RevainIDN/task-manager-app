import '../NewTask/NewTask.css';
import { SetStateAction } from 'react';
import { useNewTask } from '../../hooks/useNewTask';
import { NewBoardInfo, BoardTasks } from '../../types';
import Tag from '../Tag/Tag';

interface NewTaskProps {
	selectedBoardId: number;
	boards: NewBoardInfo[];
	setBoards: React.Dispatch<SetStateAction<NewBoardInfo[]>>;
	editMode: boolean;
	setEditMode: React.Dispatch<SetStateAction<boolean>>;
	editTaskId: number | null;
	setEditTaskId: React.Dispatch<SetStateAction<number | null>>;
	setRenderNewTask: React.Dispatch<SetStateAction<boolean>>;
	addTask: (newTaskInfo: BoardTasks) => void;
	updateTask: (updatedTaskInfo: BoardTasks) => void;
	colorTheme: boolean;
}

export default function NewTask({
	selectedBoardId,
	boards,
	setBoards,
	editMode,
	setEditMode,
	editTaskId,
	setEditTaskId,
	setRenderNewTask,
	addTask,
	updateTask,
	colorTheme,
}: NewTaskProps) {
	const {
		dropDownListStatusSelected,
		dropDownListTagsSelected,
		statusPoint,
		newTaskInfo,
		selectDropDownStatus,
		selectDropDownTags,
		saveNewTaskStatus,
		saveNewTaskTag,
		saveNewTaskName,
		generateRandomImage,
		removeImage,
		handleCloseTask,
		handleDeleteTask,
		handleSaveTask,
	} = useNewTask({
		selectedBoardId,
		boards,
		setBoards,
		editTaskId,
		setRenderNewTask,
		setEditMode,
		setEditTaskId,
		addTask,
		updateTask,
	});

	return (
		<div className='new-task'>
			<div className='task-title-cont'>
				<h1 className='task-name'>Task details</h1>
				<img className='task-close' src="Close_round-dark_theme.svg" alt="Close" onClick={handleCloseTask} />
			</div>
			<div className='task-random-img-cont'>
				<div className='task-img-btns'>
					<button className='task-img-btn task-img-btn-random' onClick={generateRandomImage}>Randome Cover</button>
					<button className='task-img-btn task-img-btn-remove' onClick={removeImage}>Remove</button>
				</div>
				<img className='task-random-img' src={newTaskInfo.img || undefined} alt="Random Image" />
			</div>
			<div className='dropdown-cont'>
				Status
				<div className='dropdown' onClick={selectDropDownStatus}>
					<div className={`task-point task-point--${statusPoint}`}></div><p>{newTaskInfo.status}</p>
					<ul className={`dropdown-list-status ${dropDownListStatusSelected ? 'dropdown-list--active' : ''}`}>
						<li className='dropdown-item-status' data-point='backlog' onClick={saveNewTaskStatus}>
							<span className='task-point task-point--backlog'></span><p>Backlog</p>
						</li>
						<li className='dropdown-item-status' data-point='in-progress' onClick={saveNewTaskStatus}>
							<span className='task-point task-point--in-progress'></span><p>In Progress</p>
						</li>
						<li className='dropdown-item-status' data-point='in-review' onClick={saveNewTaskStatus}>
							<span className='task-point task-point--in-review'></span><p>In Review</p>
						</li>
						<li className='dropdown-item-status' data-point='completed' onClick={saveNewTaskStatus}>
							<span className='task-point task-point--completed'></span><p>Completed</p>
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
				<input
					className='task-input'
					type="text"
					placeholder='e.g: Default Task'
					value={newTaskInfo.title || ''}
					onChange={saveNewTaskName}
				/>
			</label>
			<div className='task-btns'>
				<button className='task-btn task-btn-create' onClick={handleSaveTask}>Save<img src="Done_round.svg" alt="Done" /></button>
				<button className='task-btn task-btn-cancel' onClick={handleCloseTask}>Cancel</button>
				{editMode && (
					<div className='task-delete-cont'>
						<img
							className='task-delete'
							src={`${colorTheme === false ? 'Trash_icon-dark_theme.svg' : 'Trash_icon-light_theme.svg'}`}
							alt="Delete"
							onClick={handleDeleteTask}
						/>
					</div>
				)}
			</div>
		</div>
	);
}