import {
	ApolloClient,
	ApolloLink,
	from,
	HttpLink,
	InMemoryCache,
} from '@apollo/client/core';
import { provideApolloClient } from '@vue/apollo-composable';
import errorLink from '~/services/apollo/error-handler';

export const httpLink = new HttpLink({
	uri: 'https://cv-project-js.inno.ws/api/graphql',
});

const authMiddleware = new ApolloLink((operation, forward) => {
	// add the authorization to the headers
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
	cache: new InMemoryCache(),
});

export default defineNuxtPlugin(() => {
	provideApolloClient(apollo);
});
