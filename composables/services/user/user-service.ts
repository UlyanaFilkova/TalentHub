import { useQuery } from '@vue/apollo-composable';
import { ref, watchEffect } from 'vue';
import { GET_USER_BY_ID } from '~/composables/services/user/user-mutations';

interface User {
	id: string;
	created_at: string;
	email: string;
	is_verified: boolean;
	profile: {
		id: string;
		first_name: string;
		last_name: string;
		full_name: string;
		avatar: string;
	};
	department: {
		id: string;
		name: string;
	} | null;
	position: {
		id: string;
		name: string;
	} | null;
	role: string;
}

export const getUserById = (userId: string) => {
	const { result, loading, error } = useQuery<{ user: User }>(GET_USER_BY_ID, {
		userId,
	});
	const user = ref<User | null>(null);

	watchEffect(() => {
		if (result.value) {
			user.value = result.value.user;
		}
		if (error.value) {
			console.error('Error fetching user by ID:', error.value);
		}
	});

	return { user, loading, error };
};
