import { defineNuxtRouteMiddleware, navigateTo } from '#app';

export default defineNuxtRouteMiddleware((to) => {
	const accessToken = useCookie('refresh_token');

	const publicRoutes = [
		'/auth/login',
		'/auth/signup',
		'/auth/forgot-password',
		'/reset-password',
	];

	if (!accessToken.value && !publicRoutes.includes(to.path)) {
		return navigateTo('/auth/login');
	}

	if (accessToken.value && publicRoutes.includes(to.path)) {
		return navigateTo('/users');
	}
});
