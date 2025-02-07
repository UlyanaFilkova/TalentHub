import {
	ApolloClient,
	createHttpLink,
	InMemoryCache,
} from '@apollo/client/core';
import type { UpdateTokenResult } from 'cv-graphql';
import { UpdateToken } from '~/graphql/mutations/auth-mutations.graphql';

export const apolloCache = new InMemoryCache();

const newInstance = new ApolloClient({
	link: createHttpLink({ uri: 'https://cv-project-js.inno.ws/api/graphql' }),
	cache: apolloCache,
	credentials: 'include',
});

export const fetchNewToken = async () => {
	const refreshToken = useCookie('refresh_token');
	const { data } = await newInstance.mutate<{
		updateToken: UpdateTokenResult;
	}>({
		mutation: UpdateToken,
		context: {
			headers: {
				authorization: `Bearer ${refreshToken.value}`,
			},
		},
	});

	return data!.updateToken!;
};
