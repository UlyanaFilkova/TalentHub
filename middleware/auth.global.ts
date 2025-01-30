import { defineNuxtRouteMiddleware, navigateTo } from '#app';

export default defineNuxtRouteMiddleware((to) => {
	if (import.meta.client) {
		const userToken = localStorage.getItem('access');

		const publicRoutes = [
			'/auth/login',
			'/auth/signup',
			'/auth/forgot-password',
			'/reset-password',
		];

		if (!userToken && !publicRoutes.includes(to.path)) {
			return navigateTo('/auth/login');
		}
	}
});
