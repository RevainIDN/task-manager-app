import { useState, useEffect, SetStateAction } from 'react';
import { NewBoardInfo, BoardTasks } from '../../types';
import '../NewTask/NewTask.css'
import Tag from '../Tag/Tag';

interface NewTaskProps {
	currentBoard: number;
	boards: NewBoardInfo[];
	setBoards: React.Dispatch<SetStateAction<NewBoardInfo[]>>;
	editBoard: boolean;
	setEditBoard: React.Dispatch<SetStateAction<boolean>>;
	editTaskId: number | null;
	setEditTaskId: React.Dispatch<SetStateAction<number | null>>;
	setRenderNewTask: React.Dispatch<SetStateAction<boolean>>;
	addTask: (newTaskInfo: BoardTasks) => void;
	updateTask: (updatedTaskInfo: BoardTasks) => void;
	colorTheme: boolean;
}

export default function NewTask({ currentBoard, boards, setBoards, editBoard, setEditBoard, editTaskId, setEditTaskId, setRenderNewTask, addTask, updateTask, colorTheme }: NewTaskProps) {
	const [dropDownListStatusSelected, setDropDownListStatusSelected] = useState<boolean>(false);
	const [dropDownListTagsSelected, setDropDownListTagsSelected] = useState<boolean>(false);
	const [statusPoint, setStatusPoint] = useState<string>('blue');

	const [newTaskInfo, setNewTaskInfo] = useState<BoardTasks>(() => {
		const editableBoard = boards.find(board =>
			board.tasks.some(task => task.id === editTaskId)
		);
		const editableTask = editableBoard?.tasks.find(task => task.id === editTaskId);
		return editBoard && editableTask ? editableTask : ({
			id: 0,
			img: '',
			title: 'Default Task',
			tags: [{ tag: 'Concept', color: 'red' }],
			status: 'Backlog',
		});
	});

	useEffect(() => {
		if (editTaskId !== null) {
			const editableBoard = boards.find(board => board.id === currentBoard);
			const editableTask = editableBoard?.tasks.find(task => task.id === editTaskId);
			if (editableTask) {
				setNewTaskInfo(editableTask);
			}
		} else {
			setNewTaskInfo({
				id: 0,
				img: '',
				title: 'Default Task',
				tags: [{ tag: 'Concept', color: 'red' }],
				status: 'Backlog',
			});
		}
	}, [editTaskId, boards, currentBoard]);

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

	const fetchRandomImage = async () => {
		try {
			const response = await fetch(`https://picsum.photos/800/600?random=${Date.now()}`);
			if (response.ok) {
				const imageUrl = response.url;
				return imageUrl;
			} else {
				console.error('Failed to fetch the image');
				return null;
			}
		} catch (error) {
			console.error('Error fetching the image:', error);
			return null;
		}
	};

	const generateRandomImage = async () => {
		const randomImageUrl = await fetchRandomImage();
		if (randomImageUrl) {
			setNewTaskInfo(prevState => {
				const updatedTaskInfo = {
					...prevState,
					img: randomImageUrl,
				};
				localStorage.setItem('newTaskInfo', JSON.stringify(updatedTaskInfo));
				return updatedTaskInfo;
			});
		} else {
			console.error('Failed to generate random image');
		}
	};

	const removeImage = () => {
		setNewTaskInfo(prevState => ({
			...prevState,
			img: '',
		}));
	};

	const handleCloseTask = () => {
		setRenderNewTask(false);
		setEditBoard(false);
		setEditTaskId(null);
	};

	const handleDeleteTask = () => {
		setBoards(prevBoards =>
			prevBoards.map(board =>
				board.id === currentBoard
					? { ...board, tasks: board.tasks.filter(task => task.id !== editTaskId) }
					: board
			)
		);
		setRenderNewTask(false);
		setEditBoard(false);
		setEditTaskId(null);
	};

	const handleSaveTask = () => {
		if (newTaskInfo.title === '') {
			newTaskInfo.title = 'Default Task';
		}

		if (editTaskId) {
			updateTask(newTaskInfo);
		} else {
			addTask(newTaskInfo);
		}
	};

	return (
		<div className='new-task'>
			<div className='task-title-cont'>
				<h1 className='task-name'>Task details</h1>
				<img className='task-close' src="Close_round-dark_theme.svg" alt="" onClick={handleCloseTask} />
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
				<input
					className='task-input'
					type="text"
					placeholder='e.g: Default Task'
					value={newTaskInfo.title || ''}
					onChange={saveNewTaskName}
				/>
			</label>
			<div className='task-btns'>
				<button className='task-btn task-btn-create' onClick={handleSaveTask}>Save<img src="Done_round.svg" alt="" /></button>
				<button className='task-btn task-btn-cancel' onClick={handleCloseTask}>Cancel</button>
				{editBoard && (
					<div className='task-delete-cont'>
						<img
							className='task-delete'
							src={`${colorTheme === false ? 'Trash_icon-dark_theme.svg' : 'Trash_icon-light_theme.svg'}`}
							alt=""
							onClick={handleDeleteTask}
						/>
					</div>
				)}
			</div>
		</div>
	)
}