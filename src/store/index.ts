import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "./boardsSlice";
import uiReducer from "./uiSlice";

const loadFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
	try {
		const data = localStorage.getItem(key);
		return data ? JSON.parse(data) : defaultValue;
	} catch (error) {
		console.error(`Ошибка загрузки ${key} из localStorage`, error);
		return defaultValue;
	}
};

const preloadedState = {
	boards: {
		boards: loadFromLocalStorage("boards", []),
		selectedBoardId: 1,
		editTaskId: null,
	},
	ui: {
		colorTheme: loadFromLocalStorage("colorTheme", false),
		renderNewBoard: false,
		renderNewTask: false,
		editMode: false,
	},
};

const store = configureStore({
	reducer: {
		boards: boardsReducer,
		ui: uiReducer,
	},
	preloadedState,
});

store.subscribe(() => {
	const state = store.getState();
	localStorage.setItem("boards", JSON.stringify(state.boards.boards));
	localStorage.setItem("colorTheme", JSON.stringify(state.ui.colorTheme));
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
