import { gql } from '@apollo/client/core';

export const SIGNUP = gql`
	mutation SignUp($auth: AuthInput!) {
		signup(auth: $auth) {
			user {
				id
				email
			}
			access_token
			refresh_token
		}
	}
`;

export const LOGIN = gql`
	query Login($auth: AuthInput!) {
		login(auth: $auth) {
			user {
				id
				email
			}
			access_token
			refresh_token
		}
	}
`;

export const FORGOT_PASSWORD = gql`
	mutation ForgotPassword($auth: ForgotPasswordInput!) {
		forgotPassword(auth: $auth)
	}
`;

export const RESET_PASSWORD = gql`
	mutation ResetPassword($auth: ResetPasswordInput!) {
		resetPassword(auth: $auth)
	}
`;

export const REFRESH_TOKEN = gql`
	mutation UpdateToken {
		updateToken {
			access_token
			refresh_token
		}
	}
`;

export const DEPARTMENT = gql`
	query Departments {
		departments {
			name
		}
	}
`;
