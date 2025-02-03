import { gql } from '@apollo/client/core';

export const GET_CV_FULLNAME = gql`
	query GetCvFullname($cvId: ID!) {
		cv(cvId: $cvId) {
			name
		}
	}
`;
