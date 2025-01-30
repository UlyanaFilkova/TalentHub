export default defineNuxtRouteMiddleware((to, from) => {
	const { params } = to;

	if (params && params.id && to.path === `/users/${params.id}`) {
		return navigateTo(`/users/${params.id}/profile`);
	}

	if (params && params.id && to.path === `/cvs/${params.id}`) {
		return navigateTo(`/cvs/${params.id}/details`);
	}
});
