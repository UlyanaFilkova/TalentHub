import { defineNuxtRouteMiddleware, navigateTo } from '#app';

export default defineNuxtRouteMiddleware((to) => {
	const pathSegments = to.path.split('/').filter(Boolean);
	const lastSegment = pathSegments[pathSegments.length - 1];

	if (lastSegment && to.path.startsWith(`/users/${lastSegment}`)) {
		return navigateTo(`/users/${lastSegment}/profile`);
	}

	if (lastSegment && to.path.startsWith(`/cvs/${lastSegment}`)) {
		return navigateTo(`/cvs/${lastSegment}/details`);
	}
});
