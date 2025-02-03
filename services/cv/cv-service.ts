import { useQuery } from '@vue/apollo-composable';
import { ref, watchEffect } from 'vue';
import { GET_CV_FULLNAME } from '~/services/cv/cv-mutations';

export const getCvFullname = (cvId: string) => {
	const { result, loading, error } = useQuery<{
		cv: { name: string };
	}>(GET_CV_FULLNAME, { cvId });

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
