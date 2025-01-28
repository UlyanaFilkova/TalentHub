<template>
	<div class="flex flex-col items-center gap-16">
		<div class="flex flex-row justify-center gap-14 bg-background">
			<ProfilePic name="aboba" />
			<FileUpload />
		</div>
		<div class="flex flex-col items-center justify-center">
			<h5 class="font-me mb-2 text-2xl font-light text-white">
				{{ fullName }}
			</h5>
			<p class="text-upload-color">{{ email }}</p>
			<p class="text-white">A member since {{ dateJoined }}</p>
		</div>
		<form
			class="grid w-full max-w-3xl grid-cols-1 gap-x-8 gap-y-9 px-4 md:grid-cols-2 md:pr-12"
			@submit.prevent="handleSubmit"
		>
			<BaseInput id="firstName" v-model="firstName" label="First Name" />
			<BaseInput id="lastName" v-model="lastName" label="Last Name" />

			<BaseDropdown
				id="department"
				v-model="selectedDepartment"
				label="Department"
				:options="departments"
				default-option-label="No department"
			/>
			<BaseDropdown
				id="position"
				v-model="selectedPosition"
				label="Position"
				:options="positions"
				default-option-label="No position"
			/>

			<div></div>
			<BaseButton
				type="submit"
				variant="contained"
				color="primary"
				:disabled="isSubmitting"
			>
				UPDATE
			</BaseButton>
		</form>
	</div>
</template>

<script setup lang="ts">
	import { gql } from '@apollo/client/core';
	import { useQuery } from '@vue/apollo-composable';
	import { apollo, currentUserIdVar } from '~/plugins/apollo-client';

	import {
		getAllDepartments,
		getAllPositions,
		getUserById,
		updateProfile,
		updateUser,
	} from '~/services/user/user-service';

	interface Option {
		value: string;
		label: string;
	}

	definePageMeta({
		layout: 'user-profile',
	});

	const route = useRoute();
	const userId = ref(route.params.id);

	const firstName = ref('');
	const lastName = ref('');
	const fullName = ref('');
	const email = ref('');
	const dateJoined = ref('');
	const selectedDepartment = ref<Option>({ value: '', label: '' });
	const selectedPosition = ref<Option>({ value: '', label: '' });

	const departments = ref<Option[]>([]);
	const positions = ref<Option[]>([]);

	const isSubmitting = ref(false);

	console.log('Reactive Variable Value:', currentUserIdVar());

	console.log(apollo.cache.extract());

	const CURRENT_USER_ID = gql`
		query GetCurrentUserId {
			currentUserId @client
		}
	`;

	const { result: currentUserResult } = useQuery(CURRENT_USER_ID);

	console.log('Direct reactive var value:', currentUserIdVar());
	console.log('Query result:', currentUserResult.value);

	watchEffect(() => {
		console.log(
			'Current user ID from query:',
			currentUserResult.value?.currentUserId
		);
	});

	onMounted(() => {
		const {
			user: fetchedUser,
			loading,
			error,
		} = getUserById(userId.value as string);

		const { departments: fetchedDepartments } = getAllDepartments();
		const { positions: fetchedPositions } = getAllPositions();

		watch(
			fetchedDepartments,
			(newDepartments) => {
				if (newDepartments) {
					departments.value = newDepartments.map((dept) => ({
						value: dept.id,
						label: dept.name,
					}));
				}
			},
			{ immediate: true }
		);

		watch(
			fetchedPositions,
			(newPositions) => {
				if (newPositions) {
					positions.value = newPositions.map((pos) => ({
						value: pos.id,
						label: pos.name,
					}));
				}
			},
			{ immediate: true }
		);

		watch(
			fetchedUser,
			(newUser) => {
				if (newUser) {
					firstName.value = newUser.profile.first_name || '';
					lastName.value = newUser.profile.last_name || '';
					fullName.value = newUser.profile.full_name || '';
					email.value = newUser.email || '';
					dateJoined.value = newUser.created_at
						? new Date(parseInt(newUser.created_at)).toDateString()
						: '';
					selectedDepartment.value.value = newUser.department?.id || '';
					selectedDepartment.value.label = newUser.department?.name || '';

					selectedPosition.value.value = newUser.position?.id || '';
					selectedPosition.value.label = newUser.position?.name || '';
				}
			},
			{ immediate: true }
		);

		watch(
			() => route.params.id,
			(newUserId) => {
				if (newUserId !== userId.value) {
					userId.value = newUserId;
					const { user: newUser } = getUserById(userId.value as string);
					fetchedUser.value = newUser.value;
				}
			}
		);
	});
	const handleSubmit = async () => {
		isSubmitting.value = true;
		try {
			const { executeUpdate: updateUserData } = updateUser({
				userId: userId.value as string,
				departmentId: selectedDepartment.value.value,
				positionId: selectedPosition.value.value,
			});
			const { executeUpdate: updateProfileData } = updateProfile({
				userId: userId.value as string,
				first_name: firstName.value,
				last_name: lastName.value,
			});
			const [userResult, profileResult] = await Promise.all([
				updateUserData(),
				updateProfileData(),
			]);
			const { refetch } = getUserById(userId.value as string);
			const result = await refetch();
			if (result?.data?.user) {
				firstName.value = result.data.user.profile.first_name || '';
				lastName.value = result.data.user.profile.last_name || '';
				fullName.value = result.data.user.profile.full_name || '';
				selectedDepartment.value.value = result.data.user.department?.id || '';
				selectedDepartment.value.label =
					result.data.user.department?.name || '';
				selectedPosition.value.value = result.data.user.position?.id || '';
				selectedPosition.value.label = result.data.user.position?.name || '';
			}
		} catch (error) {
			console.error('Error submitting form:', error);
		} finally {
			isSubmitting.value = false;
		}
	};
</script>

<style scoped></style>
