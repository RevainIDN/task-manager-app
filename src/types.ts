export interface TagInfo {
	tag: string;
	color: string;
}

export interface BoardTasks {
	id: number;
	img: string | null;
	title: string | null;
	tags: TagInfo[];
	status: string | null;
}

export interface NewBoardInfo {
	id: number;
	newBoardName: string;
	newBoardLogo: string;
	tasks: BoardTasks[];
}