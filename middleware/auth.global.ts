import { defineNuxtRouteMiddleware, navigateTo } from '#app';

export default defineNuxtRouteMiddleware((to) => {
	const userToken = import.meta.client ? localStorage.getItem('access') : null;

	const publicRoutes = [
		'/auth/login',
		'/auth/signup',
		'/auth/forgot-password',
		'/reset-password',
	];

	if (!userToken && !publicRoutes.includes(to.path)) {
		return navigateTo('/auth/login');
	}

	if (userToken && publicRoutes.includes(to.path)) {
		return navigateTo('/users');
	}
});
