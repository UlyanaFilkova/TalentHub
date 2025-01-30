import { gql } from '@apollo/client/core';

export const GET_CV_FULLNAME = gql`
	query GetCvFullname($cvId: ID!) {
		cv(cvId: $cvId) {
			name
		}
	}
`;

export const GET_USER_WITH_CVS = gql`
	query GetUserWithCvs($userId: ID!) {
		user(userId: $userId) {
			id
			email
			cvs {
				id
				name
				education
				description
				user {
					id
					email
				}
			}
		}
	}
`;
