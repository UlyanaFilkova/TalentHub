import { useMutation } from '@vue/apollo-composable';
import type { AuthResult } from 'cv-graphql';
import {
	FORGOT_PASSWORD,
	LOGIN,
	RESET_PASSWORD,
	SIGNUP,
} from '~/composables/services/auth/auth-mutations';

export const signUp = async (auth: { email: string; password: string }) => {
	const { mutate } = useMutation<{ signup: AuthResult }>(SIGNUP);
	try {
		const res = await mutate({ auth });
		console.log('Response:', res!.data!.signup);
		if (res && res.data) {
			localStorage.setItem('access', res.data.signup.access_token);
			localStorage.setItem('refresh', res.data.signup.refresh_token);
		}
		return res!.data!;
	} catch (error) {
		console.log('Error:', error);
	}
};

export const login = async (auth: { email: string; password: string }) => {
	const { mutate } = useMutation<{ login: AuthResult }>(LOGIN);
	try {
		const res = await mutate({ auth });
		console.log('Response:', res!.data!.login);
		if (res && res.data) {
			localStorage.setItem('access', res.data.login.access_token);
			localStorage.setItem('refresh', res.data.login.refresh_token);
		}
		return res!.data!;
	} catch (error) {
		console.log('Error:', error);
	}
};

export const forgotPassword = async (email: string) => {
	const { mutate } = useMutation(FORGOT_PASSWORD);
	try {
		const res = await mutate({ auth: { email } });
		console.log('Forgot password request sent successfully:', res);
		return res;
	} catch (error) {
		console.error('Error sending forgot password request:', error);
		throw error;
	}
};

export const resetPassword = async (newPassword: string) => {
	const { mutate } = useMutation(RESET_PASSWORD);
	try {
		const res = await mutate({ auth: { newPassword } });
		console.log('Reset password successfully:', res);
		return res;
	} catch (error) {
		console.log(JSON.stringify(error));
		throw error;
	}
};
