import { useMutation, useQuery } from '@vue/apollo-composable';
import { ref, watchEffect } from 'vue';
import {
	ADD_PROFILE_SKILL,
	DELETE_AVATAR,
	DELETE_PROFILE_SKILL,
	GET_ALL_DEPARTMENTS,
	GET_ALL_POSITIONS,
	GET_ALL_SKILLS,
	GET_ALL_USERS,
	GET_CURRENT_USER_ID,
	GET_PROFILE_SKILLS,
	GET_SKILL_CATEGORIES,
	GET_USER_BY_ID,
	GET_USER_FULLNAME,
	UPDATE_PROFILE,
	UPDATE_PROFILE_SKILL,
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

export const getProfileSkills = (userId: string) => {
	const { result, loading, error, refetch } = useQuery<{
		profile: { id: string; skills: Skill[] };
	}>(GET_PROFILE_SKILLS, {
		userId,
	});

	const skills = ref<Skill[]>([]);

	watchEffect(() => {
		if (result.value?.profile) {
			skills.value = result.value.profile.skills;
		}
	});

	return { skills, loading, error, refetch };
};

export const getSkillCategories = () => {
	const { result, loading, error } = useQuery<{
		skillCategories: SkillCategory[];
	}>(GET_SKILL_CATEGORIES);

	const categories = ref<SkillCategory[]>([]);

	watchEffect(() => {
		if (result.value) {
			categories.value = result.value.skillCategories;
		}
	});

	return { categories, loading, error };
};

export const updateProfileSkill = (skill: UpdateProfileSkillInput) => {
	const {
		mutate: updateSkillMutation,
		loading,
		error,
	} = useMutation(UPDATE_PROFILE_SKILL);

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

export const getAllSkills = () => {
	const { result, loading, error } = useQuery<{ skills: SkillDefault[] }>(
		GET_ALL_SKILLS
	);
	const skills = ref<SkillDefault[]>([]);

	watchEffect(() => {
		if (result.value) {
			skills.value = result.value.skills;
		}
		if (error.value) {
			console.error('Error fetching skills:', error.value);
		}
	});

	return { skills, loading, error };
};

export const addProfileSkill = (skill: UpdateProfileSkillInput) => {
	const {
		mutate: addSkillMutation,
		loading,
		error,
	} = useMutation(ADD_PROFILE_SKILL);

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
	} = useMutation(DELETE_PROFILE_SKILL);

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
	}>(GET_USER_FULLNAME, { userId });

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
		GET_ALL_USERS
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
