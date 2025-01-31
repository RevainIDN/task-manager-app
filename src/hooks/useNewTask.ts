import { useState, useEffect, SetStateAction } from 'react';
import { NewBoardInfo, BoardTasks } from '../types';

interface UseNewTaskProps {
	selectedBoardId: number;
	boards: NewBoardInfo[];
	setBoards: React.Dispatch<SetStateAction<NewBoardInfo[]>>;
	editTaskId: number | null;
	setRenderNewTask: React.Dispatch<SetStateAction<boolean>>;
	setEditMode: React.Dispatch<SetStateAction<boolean>>;
	setEditTaskId: React.Dispatch<SetStateAction<number | null>>;
	addTask: (newTaskInfo: BoardTasks) => void;
	updateTask: (updatedTaskInfo: BoardTasks) => void;
}
export function useNewTask({
	selectedBoardId,
	boards,
	setBoards,
	editTaskId,
	setRenderNewTask,
	setEditMode,
	setEditTaskId,
	addTask,
	updateTask,
}: UseNewTaskProps) {
	const [dropDownListStatusSelected, setDropDownListStatusSelected] = useState<boolean>(false);
	const [dropDownListTagsSelected, setDropDownListTagsSelected] = useState<boolean>(false);
	const [statusPoint, setStatusPoint] = useState<string>('backlog');

	const [newTaskInfo, setNewTaskInfo] = useState<BoardTasks>({
		id: 0,
		img: '',
		title: 'Default Task',
		tags: [{ tag: 'Concept', color: 'red' }],
		status: 'Backlog',
	});

	// Инициализация состояния задачи при редактировании или создании новой задачи
	useEffect(() => {
		if (editTaskId !== null) {
			const editableBoard = boards.find(board => board.id === selectedBoardId);
			const editableTask = editableBoard?.tasks.find(task => task.id === editTaskId);
			if (editableTask) {
				setNewTaskInfo(editableTask);
				setStatusPoint(editableTask.status ? editableTask.status.replace(/\s+/g, '-').toLowerCase() : 'backlog');
			}
		} else {
			setNewTaskInfo({
				id: 0,
				img: '',
				title: 'Default Task',
				tags: [{ tag: 'Concept', color: 'red' }],
				status: 'Backlog',
			});
			setStatusPoint('backlog');
		}
	}, [editTaskId, boards, selectedBoardId]);

	// Переключение выпадающего списка статуса
	const selectDropDownStatus = () => {
		if (dropDownListTagsSelected) setDropDownListTagsSelected(false);
		setDropDownListStatusSelected(prev => !prev);
	};

	// Переключение выпадающего списка тегов
	const selectDropDownTags = () => {
		if (dropDownListStatusSelected) setDropDownListStatusSelected(false);
		setDropDownListTagsSelected(prev => !prev);
	};

	// Сохранение нового статуса задачи
	const saveNewTaskStatus = (e: React.MouseEvent<HTMLElement>) => {
		const value = e.currentTarget.textContent;
		const valuePoint = e.currentTarget.getAttribute('data-point');
		setStatusPoint(valuePoint || '');
		setNewTaskInfo(prevState => ({
			...prevState,
			status: value || '',
		}));
	};

	// Сохранение нового тега задачи
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
				tags: updatedTags,
			};
		});
	};

	// Сохранение нового имени задачи
	const saveNewTaskName = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value;
		setNewTaskInfo(prevState => ({
			...prevState,
			title: value || '',
		}));
	};

	// Получение случайного изображения
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

	// Генерация случайного изображения и сохранение его в состояние задачи
	const generateRandomImage = async () => {
		const randomImageUrl = await fetchRandomImage();
		if (randomImageUrl) {
			setNewTaskInfo(prevState => ({
				...prevState,
				img: randomImageUrl,
			}));
		} else {
			console.error('Failed to generate random image');
		}
	};

	// Удаление изображения из задачи
	const removeImage = () => {
		setNewTaskInfo(prevState => ({
			...prevState,
			img: '',
		}));
	};

	// Закрытие формы задачи
	const handleCloseTask = () => {
		setRenderNewTask(false);
		setEditMode(false);
		setEditTaskId(null);
	};

	// Удаление задачи
	const handleDeleteTask = () => {
		setBoards(prevBoards =>
			prevBoards.map(board =>
				board.id === selectedBoardId
					? { ...board, tasks: board.tasks.filter(task => task.id !== editTaskId) }
					: board
			)
		);
		setRenderNewTask(false);
		setEditMode(false);
		setEditTaskId(null);
	};

	// Сохранение задачи (новой или обновленной)
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

	return {
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
	};
}