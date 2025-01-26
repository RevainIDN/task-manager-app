import { NewBoardInfo } from "../../types";

export const saveBoardsToLocalStorage = (boards: NewBoardInfo[]) => {
	try {
		localStorage.setItem('userBoards', JSON.stringify(boards));
	} catch (error) {
		console.error('Error saving to localStorage', error);
	}
}

export const getBoardsInLocalStorage = (): NewBoardInfo[] => {
	try {
		const userBoards = localStorage.getItem('userBoards');
		if (userBoards) {
			return JSON.parse(userBoards) as NewBoardInfo[];
		}
		return [];
	} catch (error) {
		console.error('Error getting data from localStorage', error);
		return [];
	}
}

export const saveColorThemeToLocalStorage = (colorTheme: boolean) => {
	try {
		localStorage.setItem('userLightTheme', JSON.stringify(colorTheme));
	} catch (error) {
		console.error('Error saving to localStorage', error);
	}
}

export const getColorThemeInLocalStorage = (): boolean => {
	try {
		const userColorTheme = localStorage.getItem('userLightTheme');
		if (userColorTheme) {
			return JSON.parse(userColorTheme);
		}
		return false;
	} catch (error) {
		console.error('Error getting data from localStorage', error);
		return false;
	}
}