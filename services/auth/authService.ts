import { useMutation, useQuery } from '@vue/apollo-composable';
import type { AuthResult } from 'cv-graphql';
import {
	DEPARTMENT,
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
	}
	return res!.data!;
};

export const forgotPassword = async (email: string) => {
	const { mutate } = useMutation(FORGOT_PASSWORD);
	const res = await mutate({ auth: { email } });
	return res;
};

export const resetPassword = async (newPassword: string) => {
	const { mutate } = useMutation(RESET_PASSWORD);
	const res = await mutate({ auth: { newPassword } });
	return res;
};

export const departaments = () => {
	const { onResult } = useQuery(DEPARTMENT);
	onResult((res) => {
		console.log(res.data);
	});
};
