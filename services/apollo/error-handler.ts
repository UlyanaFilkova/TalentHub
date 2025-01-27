import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import type { UpdateTokenResult } from 'cv-graphql';
import { httpLink } from '~/plugins/apollo-client';
import { REFRESH_TOKEN } from '~/services/auth/auth-mutations';
import {
	showErrorToast,
	showSuccessToast,
} from '~/services/common/toastService';

const errorLink = onError(
	({ graphQLErrors, networkError, operation, forward }) => {
		if (graphQLErrors) {
			graphQLErrors.forEach(async ({ message, extensions }) => {
				if (extensions?.code === 'UNAUTHENTICATED') {
					const refreshToken = localStorage.getItem('refresh');
					if (refreshToken) {
						try {
							const refreshToken = localStorage.getItem('refresh');
							const newInstance = new ApolloClient({
								link: httpLink,
								cache: new InMemoryCache(),
							});
							const { data } = await newInstance.mutate<{
								updateToken: UpdateTokenResult;
							}>({
								mutation: REFRESH_TOKEN,
								context: {
									headers: {
										authorization: `Bearer ${refreshToken}`,
									},
								},
							});
							localStorage.setItem('refresh', data!.updateToken!.refresh_token);
							localStorage.setItem('access', data!.updateToken!.access_token);
							showSuccessToast('The session was successfully restored.');
							const oldHeaders = operation.getContext().headers;
							operation.setContext({
								headers: {
									...oldHeaders,
									authorization: `bearer ${data!.updateToken!.access_token}`,
								},
							});
							return forward(operation);
						} catch (error) {
							showErrorToast('The session has expired. Please login again.');
							localStorage.removeItem('access');
							localStorage.removeItem('refresh');
						}
					} else {
						showErrorToast('The session has expired. Please login again.');
						localStorage.removeItem('access');
					}
				} else {
					showErrorToast(message);
				}
			});
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
