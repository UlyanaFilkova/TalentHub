import { TOAST_DEFAULT_CONFIG, TOAST_TYPES } from '~/utils/toast/toastConfig';

export const showSuccessToast = (message: string) => {
	const { $toast } = useNuxtApp();
	$toast[TOAST_TYPES.SUCCESS](message, TOAST_DEFAULT_CONFIG);
};

export const showErrorToast = (message: string) => {
	const { $toast } = useNuxtApp();
	$toast[TOAST_TYPES.ERROR](message, TOAST_DEFAULT_CONFIG);
};
