import { ApolloClient, from, makeVar } from '@apollo/client/core';
import { provideApolloClient } from '@vue/apollo-composable';
import { authMiddleware, httpLink } from '~/utils/apollo/auth-middleware';
import errorLink from '~/utils/apollo/error-handler';
import { apolloCache } from '~/utils/apollo/fetch-new-token';

export const currentUserIdVar = makeVar<string | null>(null);

export default defineNuxtPlugin((nuxtApp) => {
	const apollo = new ApolloClient({
		link: from([errorLink, authMiddleware, httpLink]),
		cache: apolloCache,
	});

	provideApolloClient(apollo);
});
