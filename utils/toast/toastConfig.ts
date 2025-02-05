import type { ToastPosition, ToastTheme } from 'vue3-toastify';

interface toastConfig {
	autoClose: number;
	position: ToastPosition;
	theme: ToastTheme;
}

export const TOAST_DEFAULT_CONFIG: toastConfig = {
	autoClose: 3000,
	position: 'bottom-left',
	theme: 'colored',
};

export const TOAST_TYPES = {
	SUCCESS: 'success',
	ERROR: 'error',
} as const;
