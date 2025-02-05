import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
	editMode: boolean;
	colorTheme: boolean;
	renderNewBoard: boolean;
	renderNewTask: boolean;
}

const initialState: UIState = {
	editMode: false,
	colorTheme: false,
	renderNewBoard: false,
	renderNewTask: false,
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setEditMode(state, action: PayloadAction<boolean>) {
			state.editMode = action.payload;
		},
		setColorTheme(state, action: PayloadAction<boolean>) {
			state.colorTheme = action.payload;
		},
		setRenderNewBoard(state, action: PayloadAction<boolean>) {
			state.renderNewBoard = action.payload;
		},
		setRenderNewTask(state, action: PayloadAction<boolean>) {
			state.renderNewTask = action.payload;
		},
	},
});

export const { setEditMode, setColorTheme, setRenderNewBoard, setRenderNewTask } = uiSlice.actions;
export default uiSlice.reducer;