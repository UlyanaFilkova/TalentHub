import { onError } from '@apollo/client/link/error';

import { fetchNewToken } from '~/utils/apollo/fetch-new-token';
import { showErrorToast } from '~/utils/toast/toast';

const errorLink = onError(
	({ graphQLErrors, networkError, operation, forward }) => {
		if (graphQLErrors) {
			graphQLErrors.forEach(async ({ message, extensions }) => {
				if (extensions?.code === 'UNAUTHENTICATED') {
					try {
						const { access_token, refresh_token } = await fetchNewToken();
						const accessTokenCookie = useCookie('access_token');
						const refreshTokenCookie = useCookie('refresh_token');

						accessTokenCookie.value = access_token;
						refreshTokenCookie.value = refresh_token;

						const oldHeaders = operation.getContext().headers;
						operation.setContext({
							headers: {
								...oldHeaders,
								authorization: `Bearer ${access_token}`,
							},
						});
						return forward(operation);
					} catch (e) {
						showErrorToast('The session has expired. Please login again.');
						const accessToken = useCookie('access_token');
						const refreshToken = useCookie('refresh_token');
						accessToken.value = null;
						refreshToken.value = null;
					}
				} else {
					showErrorToast(message);
				}
			});
		}

		if (networkError) {
			if ((networkError as any)?.statusCode === 401) {
				showErrorToast('Authorization required.');
				const accessToken = useCookie('access_token');
				accessToken.value = null;
			}
		}
	}
);

export default errorLink;
