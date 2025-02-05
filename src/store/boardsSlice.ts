import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewBoardInfo } from "../types";

interface BoardsState {
	boards: NewBoardInfo[];
	selectedBoardId: number;
	editTaskId: number | null;
}

const initialState: BoardsState = {
	boards: [],
	selectedBoardId: 1,
	editTaskId: null,
}

const boardsSlice = createSlice({
	name: 'boards',
	initialState,
	reducers: {
		setBoards: (state, action: PayloadAction<NewBoardInfo[]>) => {
			state.boards = action.payload;
		},
		setSelectedBoardId: (state, action: PayloadAction<number>) => {
			state.selectedBoardId = action.payload;
		},
		setEditTaskId(state, action: PayloadAction<number | null>) {
			state.editTaskId = action.payload;
		},
	}
})

export const { setBoards, setSelectedBoardId, setEditTaskId } = boardsSlice.actions;
export default boardsSlice.reducer;