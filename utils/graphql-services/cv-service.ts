import { useQuery } from '@vue/apollo-composable';
import { GetAllCvs, GetCvFullName } from '~/graphql/queries/cv-queries.graphql';

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

export const getAllCvs = async () => {
	const { result, loading, error, refetch } = useQuery<{ cvs: CV[] }>(
		GetAllCvs
	);

	return { cvs: result.value, loading, error, refetch };
};
