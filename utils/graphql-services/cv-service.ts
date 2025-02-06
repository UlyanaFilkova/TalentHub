import { useQuery } from '@vue/apollo-composable';
import { ref, watchEffect } from 'vue';
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

	const fullname = ref('');

	watchEffect(() => {
		if (result.value) {
			fullname.value = result.value.cv.name || '';
		}

		if (error.value) {
			console.error('Error fetching CV name:', error.value);
		}
	});

	return { fullname, loading, error };
};

export const getAllCvs = () => {
	const { result, loading, error, refetch } = useQuery<{ cvs: CV[] }>(
		GetAllCvs
	);
	const cvs = ref<CV[]>([]);

	watchEffect(() => {
		if (result.value) {
			cvs.value = result.value.cvs;
		}
		if (error.value) {
			console.error('Error fetching CVs:', error.value);
		}
	});

	return { cvs, loading, error, refetch };
};
