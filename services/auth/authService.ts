import { useMutation } from '@vue/apollo-composable';
import type { AuthResult } from 'cv-graphql';
import { currentUserIdVar } from '~/plugins/apolloClient';
import {
	FORGOT_PASSWORD,
	LOGIN,
	RESET_PASSWORD,
	SIGNUP,
} from '~/services/auth/authMutations';

export const signUp = async (auth: { email: string; password: string }) => {
	const { mutate } = useMutation<{ signup: AuthResult }>(SIGNUP);
	const res = await mutate({ auth });
	if (res && res.data) {
		localStorage.setItem('access', res.data.signup.access_token);
		localStorage.setItem('refresh', res.data.signup.refresh_token);
	}
	return res!.data!;
};

export const login = async (auth: { email: string; password: string }) => {
	const { mutate } = useMutation<{ login: AuthResult }>(LOGIN);
	const res = await mutate({ auth });
	if (res && res.data) {
		localStorage.setItem('access', res.data.login.access_token);
		localStorage.setItem('refresh', res.data.login.refresh_token);
		currentUserIdVar(res.data.login.user.id);
	}
	return res!.data!;
};

export const forgotPassword = async (email: string) => {
	const { mutate } = useMutation(FORGOT_PASSWORD);
	return await mutate({ auth: { email } });
};

export const resetPassword = async (newPassword: string, token: string) => {
	console.log(token);
	const { mutate } = useMutation(RESET_PASSWORD, {
		context: {
			headers: {
				authorization: `Bearer ${token}`,
			},
		},
	});
	return await mutate({ auth: { newPassword } });
};
