import { toast } from 'vue3-toastify';

export const showSuccessToast = (message: string) => {
	toast.success(message, {
		autoClose: 3000,
		position: 'bottom-left',
		theme: 'colored',
	});
};

export const showErrorToast = (message: string) => {
	toast.error(message, {
		autoClose: 3000,
		position: 'bottom-left',
		theme: 'colored',
	});
};
