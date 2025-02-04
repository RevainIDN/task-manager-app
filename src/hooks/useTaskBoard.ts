import { NewBoardInfo } from '../types';
import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { setBoards } from '../store/boardsSlice';

interface UseTaskBoardProps {
	selectedBoardId: number;
	setRenderNewTask: Dispatch<SetStateAction<boolean>>;
	setEditMode: Dispatch<SetStateAction<boolean>>;
	setEditTaskId: Dispatch<SetStateAction<number | null>>;
	updateBoardsInLocalStorage: (updatedBoards: NewBoardInfo[]) => void;
}

export function useTaskBoard({ selectedBoardId, setRenderNewTask, setEditMode, setEditTaskId, updateBoardsInLocalStorage }: UseTaskBoardProps) {
	const dispatch = useDispatch<AppDispatch>();
	const boards = useSelector((state: RootState) => state.boards.boards);
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
		const updatedBoards = boards.map((board: NewBoardInfo) => {
			if (board.id !== selectedBoardId) return board;

			const updatedTasks = board.tasks.map((task) =>
				task.id === taskId ? { ...task, status: newStatus } : task
			);

			return { ...board, tasks: updatedTasks };
		});

		dispatch(setBoards(updatedBoards));
		updateBoardsInLocalStorage(updatedBoards);
	};

	return {
		handleShowNewTask,
		renderTasks,
		renderTasksLength,
		moveTask,
	};
}