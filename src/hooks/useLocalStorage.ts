import { useState } from 'react';

type UseLocalStorageType<T> = [T, (value: T | ((val: T) => T)) => void];

export function useLocalStorage<T>(key: string, initialValue: T): UseLocalStorageType<T> {
	// Получаем значение из localStorage или устанавливаем начальное значение
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.error(error);
			return initialValue;
		}
	});

	// Функция для обновления значения в localStorage
	const setValue = (value: T | ((val: T) => T)) => {
		try {
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.error(error);
		}
	};

	return [storedValue, setValue];
}