import { NewBoardInfo } from '../types';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { setBoards, setEditTaskId } from '../store/boardsSlice';
import { setEditMode, setRenderNewTask } from '../store/uiSlice';

export function useTaskBoard() {
	const dispatch = useDispatch<AppDispatch>();
	const { boards, selectedBoardId } = useSelector((state: RootState) => state.boards);
	const [updatedBoards, setUpdatedBoards] = useState(boards);

	useEffect(() => {
		setUpdatedBoards(boards);
	}, [boards]);

	const handleShowNewTask = () => {
		dispatch(setEditTaskId(null))
		dispatch(setEditMode(false))
		dispatch(setRenderNewTask(true))
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
	};

	return {
		handleShowNewTask,
		renderTasks,
		renderTasksLength,
		moveTask,
	};
}