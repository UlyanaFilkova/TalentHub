import { useQuery } from '@vue/apollo-composable';
import { ref, watchEffect } from 'vue';
import { GET_CV_FULLNAME, GET_USER_WITH_CVS } from '~/services/cv/cv-mutations';

interface CV {
	id: string;
	name: string;
	education: string;
	description: string;
	user: { id: string; email: string };
}

interface User {
	id: string;
	email: string;
	cvs: CV[];
}

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

export const getUserWithCVs = (userId: string) => {
	const { result, loading, error } = useQuery<{ user: User }>(
		GET_USER_WITH_CVS,
		{
			userId,
		}
	);

	const userWithCVs = ref<User | null>(null);

	watchEffect(() => {
		if (result.value) {
			userWithCVs.value = result.value.user;
		}
		if (error.value) {
			console.error('Error fetching user and their CVs:', error.value);
		}
	});

	console.log(userWithCVs);

	return { userWithCVs, loading, error };
};
