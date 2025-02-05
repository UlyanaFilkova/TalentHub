import { useQuery } from '@vue/apollo-composable';
import { ref, watchEffect } from 'vue';
import GetCvFullName from '~/graphql/queries/cv-queries.graphql';

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
