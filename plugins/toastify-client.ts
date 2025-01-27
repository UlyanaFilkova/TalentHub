import { defineNuxtPlugin } from '#app';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineNuxtPlugin(() => {
	return {
		provide: {
			toast,
		},
	};
});
