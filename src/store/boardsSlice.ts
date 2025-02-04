import { createSlice } from "@reduxjs/toolkit";
import { NewBoardInfo } from "../types";

interface BoardsState {
	boards: NewBoardInfo[];
}

const initialState: BoardsState = {
	boards: [],
}

const boardsSlice = createSlice({
	name: 'boards',
	initialState,
	reducers: {
		setBoards: (state, action) => {
			state.boards = action.payload;
		}
	}
})

export const { setBoards } = boardsSlice.actions;
export default boardsSlice.reducer;