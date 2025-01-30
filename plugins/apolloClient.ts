import { ApolloClient, ApolloLink, from, HttpLink } from '@apollo/client/core';
import { provideApolloClient } from '@vue/apollo-composable';
import errorLink, { apolloCache } from '~/services/apollo/errorHandler';

export const httpLink = new HttpLink({
	uri: 'https://cv-project-js.inno.ws/api/graphql',
});

const authMiddleware = new ApolloLink((operation, forward) => {
	const token = localStorage.getItem('access');
	operation.setContext({
		headers: {
			authorization: token ? `Bearer ${token}` : '',
		},
	});

	return forward(operation);
});

export const apollo = new ApolloClient({
	link: from([errorLink, authMiddleware, httpLink]),
	cache: apolloCache,
});

export default defineNuxtPlugin(() => {
	provideApolloClient(apollo);
});
