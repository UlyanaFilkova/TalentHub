import {
	ApolloClient,
	createHttpLink,
	InMemoryCache,
} from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import type { UpdateTokenResult } from 'cv-graphql';
import UpdateToken from '~/graphql/mutations/auth-mutations.graphql';
import { showErrorToast } from '~/utils/toast/toast';

export const apolloCache = new InMemoryCache();
const newInstance = new ApolloClient({
	link: createHttpLink({ uri: 'https://cv-project-js.inno.ws/api/graphql' }),
	cache: apolloCache,
	credentials: 'include',
});

const fetchNewToken = async () => {
	const refreshToken = localStorage.getItem('refresh');
	const { data } = await newInstance.mutate<{
		updateToken: UpdateTokenResult;
	}>({
		mutation: UpdateToken,
		context: {
			headers: {
				authorization: `Bearer ${refreshToken}`,
			},
		},
	});
	return data!.updateToken!;
};

const errorLink = onError(
	({ graphQLErrors, networkError, operation, forward }) => {
		if (graphQLErrors) {
			graphQLErrors.forEach(async ({ message, extensions }) => {
				if (extensions?.code === 'UNAUTHENTICATED') {
					try {
						const { access_token, refresh_token } = await fetchNewToken();
						localStorage.setItem('access', access_token);
						localStorage.setItem('refresh', refresh_token);
						const oldHeaders = operation.getContext().headers;
						operation.setContext({
							headers: {
								...oldHeaders,
								authorization: `Bearer ${access_token}`,
							},
						});
						console.log(forward(operation));
						return forward(operation);
					} catch (e) {
						showErrorToast('The session has expired. Please login again.');
						localStorage.clear();
						return forward(operation);
					}
				} else {
					showErrorToast(message);
				}
			});
			return forward(operation);
		}

		if (networkError) {
			if ((networkError as any)?.statusCode === 401) {
				showErrorToast('Authorization required.');
				localStorage.removeItem('access');
			}
		}
	}
);

export default errorLink;
