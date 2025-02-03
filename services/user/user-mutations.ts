import { gql } from '@apollo/client/core';

export const GET_USER_BY_ID = gql`
	query User($userId: ID!) {
		user(userId: $userId) {
			id
			created_at
			email
			is_verified
			profile {
				id
				first_name
				last_name
				full_name
				avatar
			}
			department {
				id
				name
			}
			position {
				id
				name
			}
			role
		}
	}
`;

export const UPDATE_USER = gql`
	mutation UpdateUser($user: UpdateUserInput!) {
		updateUser(user: $user) {
			id
			department {
				id
				name
			}
			position {
				id
				name
			}
		}
	}
`;

export const UPDATE_PROFILE = gql`
	mutation UpdateProfile($profile: UpdateProfileInput!) {
		updateProfile(profile: $profile) {
			id
			first_name
			last_name
		}
	}
`;

export const GET_ALL_DEPARTMENTS = gql`
	query Departments {
		departments {
			id
			name
		}
	}
`;

export const GET_ALL_POSITIONS = gql`
	query Positions {
		positions {
			id
			name
		}
	}
`;

export const GET_CURRENT_USER_ID = gql`
	query GetCurrentUserId {
		currentUserId @client
	}
`;

export const UPLOAD_AVATAR = gql`
	mutation UploadAvatar($avatar: UploadAvatarInput!) {
		uploadAvatar(avatar: $avatar)
	}
`;

export const DELETE_AVATAR = gql`
	mutation DeleteAvatar($avatar: DeleteAvatarInput!) {
		deleteAvatar(avatar: $avatar)
	}
`;

export const GET_PROFILE_SKILLS = gql`
	query ProfileSkills($userId: ID!) {
		profile(userId: $userId) {
			id
			skills {
				name
				categoryId
				mastery
			}
		}
	}
`;

export const GET_SKILL_CATEGORIES = gql`
	query SkillCategories {
		skillCategories {
			id
			name
			parent {
				id
				name
			}
		}
	}
`;

export const UPDATE_PROFILE_SKILL = gql`
	mutation UpdateProfileSkill($skill: UpdateProfileSkillInput!) {
		updateProfileSkill(skill: $skill) {
			id
			skills {
				name
				categoryId
				mastery
			}
		}
	}
`;

export const GET_ALL_SKILLS = gql`
	query Skills {
		skills {
			id
			name
			category {
				id
				order
			}
			category_name
			category_parent_name
		}
	}
`;

export const ADD_PROFILE_SKILL = gql`
	mutation AddProfileSkill($skill: AddProfileSkillInput!) {
		addProfileSkill(skill: $skill) {
			id
			skills {
				name
				categoryId
				mastery
			}
		}
	}
`;

export const DELETE_PROFILE_SKILL = gql`
	mutation DeleteProfileSkill($skill: DeleteProfileSkillInput!) {
		deleteProfileSkill(skill: $skill) {
			id
			skills {
				name
				categoryId
				mastery
			}
		}
	}
`;

export const GET_USER_FULLNAME = gql`
	query GetUserFullname($userId: ID!) {
		user(userId: $userId) {
			profile {
				full_name
			}
			email
		}
	}
`;

export const GET_ALL_USERS = gql`
	query GetAllUsers {
		users {
			id
			profile {
				first_name
				last_name
				full_name
				avatar
			}
			email
			department {
				name
			}
			position {
				name
			}
		}
	}
`;
