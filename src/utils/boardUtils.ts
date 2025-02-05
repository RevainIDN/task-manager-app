import { NewBoardInfo, BoardTasks } from "../types";
import { AppDispatch } from "../store";
import { setBoards, setEditTaskId } from "../store/boardsSlice";
import { setEditMode, setRenderNewBoard, setRenderNewTask } from "../store/uiSlice";

export const addBoard = (
	newBoardInfo: NewBoardInfo,
	dispatch: AppDispatch,
	boards: NewBoardInfo[],
) => {
	const newBoardId = boards.length > 0 ? Math.max(...boards.map(board => board.id)) + 1 : 1;
	newBoardInfo.id = newBoardId;

	const allTasks = boards.flatMap(board => board.tasks);
	const lastTaskId = allTasks.length > 0 ? Math.max(...allTasks.map(task => task.id)) : 0;
	const nextTaskId = lastTaskId + 1;

	const updatedTasks = newBoardInfo.tasks.map((task, index) => ({
		...task,
		id: nextTaskId + index,
	}));

	const updatedBoards = [...boards, { ...newBoardInfo, tasks: updatedTasks }];

	dispatch(setBoards(updatedBoards));
	dispatch(setRenderNewBoard(false));
};

export const updateBoard = (
	updatedBoard: NewBoardInfo,
	dispatch: AppDispatch,
	boards: NewBoardInfo[],
) => {
	const updatedBoards = boards.map(board =>
		board.id === updatedBoard.id ? updatedBoard : board
	);

	dispatch(setBoards(updatedBoards));
	dispatch(setEditMode(false));
	dispatch(setRenderNewBoard(false));
};

export const updateTask = (
	updatedTaskInfo: BoardTasks,
	currentBoard: number,
	dispatch: AppDispatch,
	boards: NewBoardInfo[],
) => {
	const updatedBoards = boards.map(board =>
		board.id === currentBoard
			? {
				...board,
				tasks: board.tasks.map(task =>
					task.id === updatedTaskInfo.id ? updatedTaskInfo : task
				),
			}
			: board
	);

	dispatch(setBoards(updatedBoards));
	dispatch(setEditMode(false));
	dispatch(setRenderNewTask(false));
	dispatch(setEditTaskId(null));
};

export const addTask = (
	newTaskInfo: BoardTasks,
	currentBoard: number,
	dispatch: AppDispatch,
	boards: NewBoardInfo[],
) => {
	const newTaskId = Math.max(...boards.flatMap(board => board.tasks.map(task => task.id))) + 1;

	newTaskInfo.id = newTaskId;

	const updatedBoards = boards.map(board =>
		board.id === currentBoard
			? { ...board, tasks: [...board.tasks, newTaskInfo] }
			: board
	);

	dispatch(setBoards(updatedBoards));
	dispatch(setRenderNewTask(false));
};