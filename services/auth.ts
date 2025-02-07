import { useMutation, useQuery } from '@vue/apollo-composable';
import type { AuthResult } from 'cv-graphql';
import {
	ForgotPassword,
	ResetPassword,
	SignUp,
} from '~/graphql/mutations/auth.graphql';
import Login from '~/graphql/queries/auth.graphql';
import { currentUserIdVar } from '~/plugins/apollo-client';

export const signUp = async (auth: { email: string; password: string }) => {
	const { mutate } = useMutation<{ signup: AuthResult }>(SignUp);
	const res = await mutate({ auth });
	if (res && res.data) {
		const accessToken = useCookie('access_token', {
			maxAge: 60,
			path: '/',
		});
		const refreshToken = useCookie('refresh_token', {
			maxAge: 60 * 60 * 24 * 30,
			path: '/',
		});

		accessToken.value = res.data.signup.access_token;
		refreshToken.value = res.data.signup.refresh_token;
	}
	return res!.data!;
};

export const login = async (auth: { email: string; password: string }) => {
	const { onResult, onError, stop } = useQuery<{ login: AuthResult }>(Login, {
		auth,
	});
	return new Promise((resolve, reject) => {
		onResult((res) => {
			if (res && res.data) {
				const accessToken = useCookie('access_token');
				const refreshToken = useCookie('refresh_token');

				accessToken.value = res.data.login.access_token;
				refreshToken.value = res.data.login.refresh_token;
				currentUserIdVar(res.data.login.user.id);
				stop();
				resolve(res.data);
			}
		});
		onError((err) => {
			stop();
			reject(err);
		});
	});
};

export const forgotPassword = async (email: string) => {
	const { mutate } = useMutation(ForgotPassword);
	return await mutate({ auth: { email } });
};

export const resetPassword = async (newPassword: string, token: string) => {
	const { mutate } = useMutation(ResetPassword, {
		context: {
			headers: {
				authorization: `Bearer ${token}`,
			},
		},
	});
	return await mutate({ auth: { newPassword } });
};
