import { ApolloLink, HttpLink } from '@apollo/client/core';

export const authMiddleware = new ApolloLink((operation, forward) => {
	const token = useCookie('access_token').value;

	if (operation.operationName !== 'ResetPassword') {
		operation.setContext({
			headers: {
				authorization: token ? `Bearer ${token}` : '',
			},
		});
	}

	return forward(operation);
});

export const httpLink = new HttpLink({
	uri: import.meta.env.VITE_GRAPHQL_URI,
});
