import { NewBoardInfo } from '../types';
import { Dispatch, SetStateAction } from 'react';

interface UseTaskBoardProps {
	selectedBoardId: number;
	boards: NewBoardInfo[];
	setRenderNewTask: Dispatch<SetStateAction<boolean>>;
	setEditMode: Dispatch<SetStateAction<boolean>>;
	setEditTaskId: Dispatch<SetStateAction<number | null>>;
}

export function useTaskBoard({ selectedBoardId, boards, setRenderNewTask, setEditMode, setEditTaskId }: UseTaskBoardProps) {
	// Функция для показа формы создания новой задачи
	const handleShowNewTask = () => {
		setEditTaskId(null);
		setEditMode(false);
		setRenderNewTask(true);
	};

	// Получение задач текущей доски
	const currentBoardTasks = boards.find(board => board.id === selectedBoardId)?.tasks || [];

	// Функция для фильтрации задач по их статусу
	const renderTasks = (status: string) => {
		return currentBoardTasks.filter(task => task.status === status);
	};

	// Функция для получения количества задач с определенным статусом
	const renderTasksLength = (status: string) => {
		return currentBoardTasks.filter(task => task.status === status).length;
	};

	return {
		handleShowNewTask,
		renderTasks,
		renderTasksLength,
	};
}