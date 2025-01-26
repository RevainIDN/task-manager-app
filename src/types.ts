interface BoardTasks {
	id: number;
	img: string;
	title: string;
	tag: string;
	status: string;
}

export interface NewBoardInfo {
	id: number;
	newBoardName: string;
	newBoardLogo: string;
	tasks: BoardTasks[];
}