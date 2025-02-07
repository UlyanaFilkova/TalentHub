import { useMutation, useQuery } from '@vue/apollo-composable';
import { ref, watchEffect } from 'vue';
import { CreateCV } from '~/graphql/mutations/cv.graphql';
import { GetAllCvs, GetCvFullName } from '~/graphql/queries/cv.graphql';

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

export const createCV = async (cv: CreateCV) => {
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
