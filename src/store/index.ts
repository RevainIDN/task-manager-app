import { configureStore } from "@reduxjs/toolkit"
import boardsReducer from './boardsSlice'
import uiReducer from './uiSlice'

const store = configureStore({
	reducer: {
		boards: boardsReducer,
		ui: uiReducer,
	}
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;