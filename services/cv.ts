import { useApolloClient, useMutation, useQuery } from '@vue/apollo-composable';
import { CreateCV, DeleteCV } from '~/graphql/mutations/cv.graphql';
import {
	GetAllCvs,
	GetCvById,
	GetCvFullName,
} from '~/graphql/queries/cv.graphql';

interface CV {
	id: string;
	name: string;
	education: string;
	description: string;
	user: {
		id: string;
		email: string;
	};
}

interface CreateCV {
	description: string;
	education: string;
	name: string;
	userId: string;
}

export const getCvFullname = (cvId: string) => {
	const { result, loading, error } = useQuery<{
		cv: { name: string };
	}>(GetCvFullName, { cvId });

	let fullname = '';

	if (result.value) {
		fullname = result.value.cv.name || '';
	}

	return { fullname, loading, error };
};

export const getCvById = async (cvId: string, force = false) => {
	const apolloClient = useApolloClient().client;

	try {
		const { data } = await apolloClient.query({
			query: GetCvById,
			variables: { cvId },
			fetchPolicy: 'no-cache',
		});

		return {
			cv: data.cv,
			error: null,
		};
	} catch (error) {
		console.error('Error fetching cv by ID:', error);
		return {
			cv: null,
			error,
		};
	}
};

export const getAllCvs = async () => {
	const { result, loading, error, refetch } = useQuery<{ cvs: CV[] }>(
		GetAllCvs
	);

	return { cvs: result.value, loading, error, refetch };
};

export const createCv = async (cv: CreateCV) => {
	const { mutate } = useMutation(CreateCV, {
		variables: {
			cv: {
				userId: cv.userId,
				name: cv.name,
				education: cv.education,
				description: cv.description,
			},
		},
	});
	return await mutate({ cv });
};

export const deleteCv = async (cvId: string) => {
	const { mutate } = useMutation(DeleteCV);
	await mutate({
		cv: { cvId },
	});
};
