import { useApolloClient, useMutation, useQuery } from '@vue/apollo-composable';
import { ref, watchEffect } from 'vue';
import {
	AddProfileSkill,
	DeleteAvatar,
	DeleteProfileSkill,
	UpdateProfile,
	UpdateProfileSkill,
	UpdateUser,
	UploadAvatar,
} from '~/graphql/mutations/user.graphql';
import {
	GetAllDepartments,
	GetAllPositions,
	GetAllSkills,
	GetAllUsers,
	GetProfileSkills,
	GetSkillCategories,
	GetUserById,
	GetUserFullName,
} from '~/graphql/queries/user.graphql';

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

interface Skill {
	name: string;
	categoryId: string;
	mastery: 'Novice' | 'Advanced' | 'Competent' | 'Proficient' | 'Expert';
}

interface SkillDefault {
	id: string;
	name: string;
	category: {
		id: string;
		order: number;
	};
	category_name: string;
	category_parent_name: string;
}

interface SkillCategory {
	id: string;
	name: string;
	parent: {
		id: string;
		name: string;
	} | null;
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

interface UpdateProfileSkillInput {
	userId: string;
	name: string;
	categoryId: string;
	mastery: Skill['mastery'];
}

interface UploadAvatarInput {
	userId: string;
	base64: string;
	size: number;
	type: string;
}

export const getUserById = async (userId: string, force = false) => {
	const apolloClient = useApolloClient().client;

	try {
		const { data } = await apolloClient.query({
			query: GetUserById,
			variables: { userId },
			fetchPolicy: 'no-cache',
		});

		return {
			user: data.user,
			error: null,
		};
	} catch (error) {
		console.error('Error fetching user by ID:', error);
		return {
			user: null,
			error,
		};
	}
};

export const getAllDepartments = async () => {
	console.log(
		'getAllDepartments running on:',
		import.meta.server ? 'server' : 'client'
	);

	const apolloClient = useApolloClient().client;

	try {
		console.log('Making GraphQL request...');

		const { data } = await apolloClient.query({
			query: GetAllDepartments,
		});
		console.log('GraphQL request completed');

		return {
			departments: data.departments,
			error: null,
		};
	} catch (error) {
		console.error('Error fetching departments:', error);
		return {
			departments: [],
			error,
		};
	}
};

export const getAllPositions = async () => {
	const apolloClient = useApolloClient().client;

	try {
		const { data } = await apolloClient.query({
			query: GetAllPositions,
		});

		return {
			positions: data.positions,
			error: null,
		};
	} catch (error) {
		console.error('Error fetching positions:', error);
		return {
			positions: [],
			error,
		};
	}
};

export const updateUser = (user: UpdateUserInput) => {
	const {
		mutate: updateUserMutation,
		loading,
		error,
	} = useMutation(UpdateUser);

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
	} = useMutation(UpdateProfile);

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

export const uploadAvatar = (avatar: UploadAvatarInput) => {
	const { mutate: executeUpload, loading, error } = useMutation(UploadAvatar);

	return {
		executeUpload: () => executeUpload({ avatar }),
		loading,
		error,
	};
};

export const deleteAvatar = (userId: string) => {
	const { mutate: executeDelete, loading, error } = useMutation(DeleteAvatar);

	return {
		executeDelete: () =>
			executeDelete({
				avatar: { userId },
			}),
		loading,
		error,
	};
};

export const getProfileSkills = async (userId: string) => {
	const apolloClient = useApolloClient().client;

	try {
		const { data } = await apolloClient.query({
			query: GetProfileSkills,
			variables: { userId },
			fetchPolicy: 'no-cache',
		});
		return {
			skills: data.profile.skills,
			error: null,
		};
	} catch (error) {
		console.error('Error fetching profile skills:', error);
		return {
			skills: [],
			error,
		};
	}
};

export const getSkillCategories = async () => {
	const apolloClient = useApolloClient().client;

	try {
		const { data } = await apolloClient.query({
			query: GetSkillCategories,
		});
		return {
			categories: data.skillCategories,
			error: null,
		};
	} catch (error) {
		console.error('Error fetching skill categories:', error);
		return {
			categories: [],
			error,
		};
	}
};

export const getAllSkills = async () => {
	const apolloClient = useApolloClient().client;

	try {
		const { data } = await apolloClient.query({
			query: GetAllSkills,
		});
		return {
			skills: data.skills,
			error: null,
		};
	} catch (error) {
		console.error('Error fetching skills:', error);
		return {
			skills: [],
			error,
		};
	}
};

export const updateProfileSkill = (skill: UpdateProfileSkillInput) => {
	const {
		mutate: updateSkillMutation,
		loading,
		error,
	} = useMutation(UpdateProfileSkill);

	const executeUpdate = async () => {
		try {
			const response = await updateSkillMutation({ skill });
			return response!.data?.updateProfileSkill;
		} catch (err) {
			console.error('Error updating skill:', err);
			throw err;
		}
	};

	return { executeUpdate, loading, error };
};

export const addProfileSkill = (skill: UpdateProfileSkillInput) => {
	const {
		mutate: addSkillMutation,
		loading,
		error,
	} = useMutation(AddProfileSkill);

	const executeAdd = async () => {
		try {
			const response = await addSkillMutation({ skill });
			return response!.data?.addProfileSkill;
		} catch (err) {
			console.error('Error adding skill:', err);
			throw err;
		}
	};

	return { executeAdd, loading, error };
};

export const deleteProfileSkill = (userId: string, skillNames: string[]) => {
	const {
		mutate: deleteSkillMutation,
		loading,
		error,
	} = useMutation(DeleteProfileSkill);

	const executeDelete = async () => {
		try {
			const response = await deleteSkillMutation({
				skill: {
					userId,
					name: skillNames,
				},
			});
			return response!.data?.deleteProfileSkill;
		} catch (err) {
			console.error('Error deleting skills:', err);
			throw err;
		}
	};

	return { executeDelete, loading, error };
};

export const getUserFullname = (userId: string) => {
	const { result, loading, error } = useQuery<{
		user: { profile: { full_name: string }; email: string };
	}>(GetUserFullName, { userId });

	const fullname = ref('');
	const email = ref('');

	watchEffect(() => {
		if (result.value) {
			fullname.value = result.value.user.profile.full_name || '';
			email.value = result.value.user.email || '';
		}

		if (error.value) {
			console.error('Error fetching user details:', error.value);
		}
	});

	return { fullname, email, loading, error };
};

export const getAllUsers = () => {
	const { result, loading, error, refetch } = useQuery<{ users: User[] }>(
		GetAllUsers
	);
	const users = ref<User[]>([]);

	watchEffect(() => {
		if (result.value) {
			users.value = result.value.users;
		}
		if (error.value) {
			console.error('Error fetching users:', error.value);
		}
	});

	return { users, loading, error, refetch };
};
