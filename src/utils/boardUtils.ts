import { NewBoardInfo, BoardTasks } from "../types";

export const addBoard = (
	newBoardInfo: NewBoardInfo,
	selectedBoardId: number,
	setCurrentBoardId: React.Dispatch<React.SetStateAction<number>>,
	currentTaskId: number,
	setCurrentTaskId: React.Dispatch<React.SetStateAction<number>>,
	setBoards: React.Dispatch<React.SetStateAction<NewBoardInfo[]>>,
	setRenderNewBoard: React.Dispatch<React.SetStateAction<boolean>>
) => {
	newBoardInfo.id = selectedBoardId + 1;
	setCurrentBoardId(selectedBoardId + 1);

	setBoards(prevBoards => {
		const updatedTasks = newBoardInfo.tasks.map(task => {
			const newTaskId = currentTaskId + 1;
			setCurrentTaskId(newTaskId);
			return { ...task, id: newTaskId };
		});

		return [...prevBoards, { ...newBoardInfo, tasks: updatedTasks }];
	});

	setRenderNewBoard(false);
};

export const updateBoard = (
	updatedBoard: NewBoardInfo,
	setBoards: React.Dispatch<React.SetStateAction<NewBoardInfo[]>>,
	setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
	setRenderNewBoard: React.Dispatch<React.SetStateAction<boolean>>
) => {
	setBoards(prevBoards =>
		prevBoards.map(board =>
			board.id === updatedBoard.id ? updatedBoard : board
		)
	);
	setEditMode(false);
	setRenderNewBoard(false);
};

export const updateTask = (
	updatedTaskInfo: BoardTasks,
	currentBoard: number,
	setBoards: React.Dispatch<React.SetStateAction<NewBoardInfo[]>>,
	setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
	setRenderNewTask: React.Dispatch<React.SetStateAction<boolean>>,
	setEditTaskId: React.Dispatch<React.SetStateAction<number | null>>
) => {
	setBoards(prevBoards =>
		prevBoards.map(board =>
			board.id === currentBoard
				? {
					...board,
					tasks: board.tasks.map(task =>
						task.id === updatedTaskInfo.id ? updatedTaskInfo : task
					),
				}
				: board
		)
	);
	setEditMode(false);
	setRenderNewTask(false);
	setEditTaskId(null);
};

export const addTask = (
	newTaskInfo: BoardTasks,
	currentBoard: number,
	setCurrentTaskId: React.Dispatch<React.SetStateAction<number>>,
	setBoards: React.Dispatch<React.SetStateAction<NewBoardInfo[]>>,
	setRenderNewTask: React.Dispatch<React.SetStateAction<boolean>>
) => {
	setCurrentTaskId(prevTaskId => {
		const newTaskId = prevTaskId + 1;
		newTaskInfo.id = newTaskId;
		return newTaskId;
	});
	setBoards(prevBoards =>
		prevBoards.map(board =>
			board.id === currentBoard
				? { ...board, tasks: [...board.tasks, newTaskInfo] }
				: board
		)
	);
	setRenderNewTask(false);
};