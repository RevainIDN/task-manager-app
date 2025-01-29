import { NewBoardInfo } from '../types';
import { Dispatch, SetStateAction } from 'react';

interface UseTaskBoardProps {
	currentBoard: number;
	boards: NewBoardInfo[];
	setRenderNewTask: Dispatch<SetStateAction<boolean>>;
	setEditBoard: Dispatch<SetStateAction<boolean>>;
	setEditTaskId: Dispatch<SetStateAction<number | null>>;
}

export function useTaskBoard({ currentBoard, boards, setRenderNewTask, setEditBoard, setEditTaskId }: UseTaskBoardProps) {
	const handleShowNewTask = () => {
		setEditTaskId(null);
		setEditBoard(false);
		setRenderNewTask(true);
	};

	const currentBoardTasks = boards.find(board => board.id === currentBoard)?.tasks || [];

	const renderTasks = (status: string) => {
		return currentBoardTasks.filter(task => task.status === status);
	};

	const renderTasksLength = (status: string) => {
		return currentBoardTasks.filter(task => task.status === status).length;
	};

	return {
		handleShowNewTask,
		renderTasks,
		renderTasksLength,
	};
}