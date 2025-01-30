import { NewBoardInfo } from '../types';
import { useState, Dispatch, SetStateAction, useEffect } from 'react';

interface UseTaskBoardProps {
	selectedBoardId: number;
	boards: NewBoardInfo[];
	setRenderNewTask: Dispatch<SetStateAction<boolean>>;
	setEditMode: Dispatch<SetStateAction<boolean>>;
	setEditTaskId: Dispatch<SetStateAction<number | null>>;
	setBoards: Dispatch<SetStateAction<NewBoardInfo[]>>; // Добавляем setBoards
}

export function useTaskBoard({ selectedBoardId, boards, setRenderNewTask, setEditMode, setEditTaskId, setBoards }: UseTaskBoardProps) {
	const [updatedBoards, setUpdatedBoards] = useState(boards);

	useEffect(() => {
		setUpdatedBoards(boards);
	}, [boards]);

	const handleShowNewTask = () => {
		setEditTaskId(null);
		setEditMode(false);
		setRenderNewTask(true);
	};

	const renderTasks = (status: string) => {
		const currentBoard = updatedBoards.find(board => board.id === selectedBoardId);
		return currentBoard ? currentBoard.tasks.filter(task => task.status === status) : [];
	};

	const renderTasksLength = (status: string) => {
		return renderTasks(status).length;
	};

	const moveTask = (taskId: number, newStatus: string) => {
		setBoards(prevBoards => {
			return prevBoards.map(board => {
				if (board.id !== selectedBoardId) return board;

				const updatedTasks = board.tasks.map(task =>
					task.id === taskId ? { ...task, status: newStatus } : task
				);

				return { ...board, tasks: updatedTasks };
			});
		});
	};

	return {
		handleShowNewTask,
		renderTasks,
		renderTasksLength,
		moveTask,
	};
}