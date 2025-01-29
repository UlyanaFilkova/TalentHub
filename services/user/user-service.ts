import { useMutation, useQuery } from '@vue/apollo-composable';
import { ref, watchEffect } from 'vue';
import {
	DELETE_AVATAR,
	GET_ALL_DEPARTMENTS,
	GET_ALL_POSITIONS,
	GET_CURRENT_USER_ID,
	GET_USER_BY_ID,
	GET_USER_FULLNAME,
	UPDATE_PROFILE,
	UPDATE_USER,
	UPLOAD_AVATAR,
} from '~/services/user/user-mutations';

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
	department: Department | null;
	position: Position | null;
	role: string;
}

interface Department {
	id: string;
	name: string;
}

interface Position {
	id: string;
	name: string;
}

interface UpdateUserInput {
	userId: string;
	departmentId?: string;
	positionId?: string;
	role?: string;
}

interface UpdateProfileInput {
	userId: string;
	first_name: string;
	last_name: string;
}
interface UploadAvatarInput {
	userId: string;
	base64: string;
	size: number;
	type: string;
}

export const getUserById = (userId: string) => {
	const { result, loading, error, refetch } = useQuery<{ user: User }>(
		GET_USER_BY_ID,
		{
			userId,
		}
	);
	const user = ref<User | null>(null);

	watchEffect(() => {
		if (result.value) {
			user.value = result.value.user;
		}
		if (error.value) {
			console.error('Error fetching user by ID:', error.value);
		}
	});

	return { user, loading, error, refetch };
};

export const getAllDepartments = () => {
	const { result, loading, error } = useQuery<{ departments: Department[] }>(
		GET_ALL_DEPARTMENTS
	);
	const departments = ref<Department[]>([]);

	watchEffect(() => {
		if (result.value) {
			departments.value = result.value.departments;
		}
		if (error.value) {
			console.error('Error fetching departments:', error.value);
		}
	});

	return { departments, loading, error };
};

export const getAllPositions = () => {
	const { result, loading, error } = useQuery<{ positions: Position[] }>(
		GET_ALL_POSITIONS
	);
	const positions = ref<Position[]>([]);

	watchEffect(() => {
		if (result.value) {
			positions.value = result.value.positions;
		}
		if (error.value) {
			console.error('Error fetching positions:', error.value);
		}
	});

	return { positions, loading, error };
};

export const updateUser = (user: UpdateUserInput) => {
	const {
		mutate: updateUserMutation,
		loading,
		error,
	} = useMutation(UPDATE_USER);

	const executeUpdate = async () => {
		try {
			const response = await updateUserMutation({ user });
			return response!.data?.updateUser;
		} catch (err) {
			console.error('Error updating user:', err);
			throw err;
		}
	};

	return { executeUpdate, loading, error };
};

export const updateProfile = (profile: UpdateProfileInput) => {
	const {
		mutate: updateProfileMutation,
		loading,
		error,
	} = useMutation(UPDATE_PROFILE);

	const executeUpdate = async () => {
		try {
			const response = await updateProfileMutation({ profile });
			return response!.data?.updateProfile;
		} catch (err) {
			console.error('Error updating profile:', err);
			throw err;
		}
	};

	return { executeUpdate, loading, error };
};

export const getCurrentUserId = () => {
	const { result, loading, error } = useQuery(GET_CURRENT_USER_ID);
	const currentUserId = ref<string | null>(null);

	watchEffect(() => {
		if (result.value) {
			currentUserId.value = result.value.currentUserId;
		}
		if (error.value) {
			console.error('Error fetching current user ID:', error.value);
		}
	});

	return { currentUserId, loading, error };
};

export const uploadAvatar = (avatar: UploadAvatarInput) => {
	const { mutate: executeUpload, loading, error } = useMutation(UPLOAD_AVATAR);

	return {
		executeUpload: () => executeUpload({ avatar }),
		loading,
		error,
	};
};

export const deleteAvatar = (userId: string) => {
	const { mutate: executeDelete, loading, error } = useMutation(DELETE_AVATAR);

	return {
		executeDelete: () =>
			executeDelete({
				avatar: { userId },
			}),
		loading,
		error,
	};
};

export const getUserFullname = (userId: string) => {
	const { result, loading, error } = useQuery<{
		user: { profile: { full_name: string } };
	}>(GET_USER_FULLNAME, { userId });

	const fullname = ref('');

	watchEffect(() => {
		if (result.value) {
			fullname.value = result.value.user.profile.full_name || '';
		}

		if (error.value) {
			console.error('Error fetching full name:', error.value);
		}
	});

	return { fullname, loading, error };
};
