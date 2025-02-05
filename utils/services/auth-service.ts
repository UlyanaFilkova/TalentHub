import { useMutation, useQuery } from '@vue/apollo-composable';
import type { AuthResult } from 'cv-graphql';
import {
	ForgotPassword,
	ResetPassword,
	SignUp,
} from '~/graphql/mutations/auth-mutations.graphql';
import Login from '~/graphql/queries/auth-queries.graphql';
import { currentUserIdVar } from '~/plugins/apolloClient';

export const signUp = async (auth: { email: string; password: string }) => {
	const { mutate } = useMutation<{ signup: AuthResult }>(SignUp);
	const res = await mutate({ auth });
	if (res && res.data) {
		localStorage.setItem('access', res.data.signup.access_token);
		localStorage.setItem('refresh', res.data.signup.refresh_token);
	}
	return res!.data!;
};

export const login = async (auth: { email: string; password: string }) => {
	const { onResult } = useQuery<{ login: AuthResult }>(Login, { auth });
	return new Promise((resolve) => {
		onResult((res) => {
			if (res && res.data) {
				localStorage.setItem('access', res.data.login.access_token);
				localStorage.setItem('refresh', res.data.login.refresh_token);
				currentUserIdVar(res.data.login.user.id);
				resolve(res.data);
			}
		});
	});
};

export const forgotPassword = async (email: string) => {
	const { mutate } = useMutation(ForgotPassword);
	return await mutate({ auth: { email } });
};

export const resetPassword = async (newPassword: string, token: string) => {
	console.log(token);
	const { mutate } = useMutation(ResetPassword, {
		context: {
			headers: {
				authorization: `Bearer ${token}`,
			},
		},
	});
	return await mutate({ auth: { newPassword } });
};
