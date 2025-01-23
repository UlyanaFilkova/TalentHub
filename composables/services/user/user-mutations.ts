import { gql } from '@apollo/client/core';

export const GET_USER_BY_ID = gql`
	query User($userId: ID!) {
		user(userId: $userId) {
			id
			created_at
			email
			is_verified
			profile {
				id
				first_name
				last_name
				full_name
				avatar
			}
			department {
				id
				name
			}
			position {
				id
				name
			}
			role
		}
	}
`;
