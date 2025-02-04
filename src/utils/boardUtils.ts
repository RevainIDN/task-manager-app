import { NewBoardInfo, BoardTasks } from "../types";
import { AppDispatch } from "../store";
import { setBoards } from "../store/boardsSlice";

export const addBoard = (
	newBoardInfo: NewBoardInfo,
	dispatch: AppDispatch,
	boards: NewBoardInfo[],
	setRenderNewBoard: React.Dispatch<React.SetStateAction<boolean>>,
	updateBoardsInLocalStorage: (updatedBoards: NewBoardInfo[]) => void,
) => {
	const newBoardId = boards.length > 0 ? Math.max(...boards.map(board => board.id)) + 1 : 1;
	newBoardInfo.id = newBoardId;

	// Найти максимальный ID среди всех существующих задач
	const allTasks = boards.flatMap(board => board.tasks);
	const lastTaskId = allTasks.length > 0 ? Math.max(...allTasks.map(task => task.id)) : 0;
	const nextTaskId = lastTaskId + 1;

	// Если у новой доски есть дефолтные задачи, назначаем им новые ID
	const updatedTasks = newBoardInfo.tasks.map((task, index) => ({
		...task,
		id: nextTaskId + index, // Каждой задаче присваивается новый ID
	}));

	const updatedBoards = [...boards, { ...newBoardInfo, tasks: updatedTasks }];

	dispatch(setBoards(updatedBoards));
	setRenderNewBoard(false);
	updateBoardsInLocalStorage(updatedBoards);
};

export const updateBoard = (
	updatedBoard: NewBoardInfo,
	dispatch: AppDispatch,
	boards: NewBoardInfo[],
	setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
	setRenderNewBoard: React.Dispatch<React.SetStateAction<boolean>>,
	updateBoardsInLocalStorage: (updatedBoards: NewBoardInfo[]) => void,
) => {
	const updatedBoards = boards.map(board =>
		board.id === updatedBoard.id ? updatedBoard : board
	);

	dispatch(setBoards(updatedBoards));
	setEditMode(false);
	setRenderNewBoard(false);
	updateBoardsInLocalStorage(updatedBoards)
};

export const updateTask = (
	updatedTaskInfo: BoardTasks,
	currentBoard: number,
	dispatch: AppDispatch,
	boards: NewBoardInfo[],
	setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
	setRenderNewTask: React.Dispatch<React.SetStateAction<boolean>>,
	setEditTaskId: React.Dispatch<React.SetStateAction<number | null>>,
	updateBoardsInLocalStorage: (updatedBoards: NewBoardInfo[]) => void,
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
	setEditMode(false);
	setRenderNewTask(false);
	setEditTaskId(null);
	updateBoardsInLocalStorage(updatedBoards)
};

export const addTask = (
	newTaskInfo: BoardTasks,
	currentBoard: number,
	dispatch: AppDispatch,
	boards: NewBoardInfo[],
	setRenderNewTask: React.Dispatch<React.SetStateAction<boolean>>,
	updateBoardsInLocalStorage: (updatedBoards: NewBoardInfo[]) => void,
) => {
	const newTaskId = Math.max(...boards.flatMap(board => board.tasks.map(task => task.id))) + 1;

	newTaskInfo.id = newTaskId;

	const updatedBoards = boards.map(board =>
		board.id === currentBoard
			? { ...board, tasks: [...board.tasks, newTaskInfo] }
			: board
	);

	dispatch(setBoards(updatedBoards));
	setRenderNewTask(false);
	updateBoardsInLocalStorage(updatedBoards);
};