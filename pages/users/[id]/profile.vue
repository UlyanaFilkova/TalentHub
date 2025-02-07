<template>
	<div v-if="isLoading" class="flex flex-col items-center gap-16">Loading</div>
	<div v-else class="flex flex-col items-center gap-16">
		<div class="flex flex-row justify-center gap-14 bg-dark-1">
			<div class="relative">
				<BaseUserPic
					:key="fullName"
					:class="'h-[120px] w-[120px] bg-gray-4 text-4xl'"
					:name="fullName"
					:photo="avatar"
				/>
				<button
					v-if="avatar"
					:disabled="isDeletingAvatar"
					class="absolute -right-5 -top-5 flex h-10 w-10 items-center justify-center rounded-full text-3xl text-white transition duration-300 hover:bg-dark-4"
					@click="handleDeleteAvatar"
				>
					<span
						class="relative -top-[2px] flex h-full w-full items-center justify-center leading-none"
					>
						×
					</span>
				</button>
			</div>
			<FileUpload
				:user-id="userId"
				@upload-success="handleUploadSuccess"
				@upload-start="isUploading = true"
				@upload-end="isUploading = false"
			/>
		</div>
		<div class="flex flex-col items-center justify-center">
			<h5 class="font-me mb-2 text-2xl font-light text-white">
				{{ fullName }}
			</h5>
			<p class="text-gray-10">{{ email }}</p>
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
				:disabled="isSubmitting || isUploading || !hasChanges"
			>
				UPDATE
			</BaseButton>
		</form>
	</div>
</template>

<script setup lang="ts">
	import {
		deleteAvatar,
		getAllDepartments,
		getAllPositions,
		getUserById,
		updateProfile,
		updateUser,
	} from '~/utils/graphql-services/user-service';
	import { showErrorToast, showSuccessToast } from '~/utils/toast/toast';
	interface Option {
		value: string;
		label: string;
	}

	definePageMeta({
		layout: 'user-profile',
	});

	const route = useRoute();
	const userId = ref(route.params.id as string);

	const initialValues = ref({
		firstName: '',
		lastName: '',
		selectedDepartment: { value: '', label: '' },
		selectedPosition: { value: '', label: '' },
	});

	const firstName = ref('');
	const lastName = ref('');
	const fullName = ref('');
	const email = ref('');
	const dateJoined = ref('');
	const avatar = ref('');
	const selectedDepartment = ref<Option>({ value: '', label: '' });
	const selectedPosition = ref<Option>({ value: '', label: '' });

	const departments = ref<Option[]>([]);
	const positions = ref<Option[]>([]);

	const isSubmitting = ref(false);
	const isUploading = ref(false);
	const isDeletingAvatar = ref(false);

	const hasChanges = computed(() => {
		return (
			firstName.value !== initialValues.value.firstName ||
			lastName.value !== initialValues.value.lastName ||
			selectedDepartment.value.value !==
				initialValues.value.selectedDepartment.value ||
			selectedPosition.value.value !==
				initialValues.value.selectedPosition.value
		);
	});

	const userDataKey = `user-${userId.value}`;
	const refreshUser = ref();

	const { data: userData } = useNuxtData(userDataKey);
	const { data: departmentsData } = useNuxtData('departments');
	const { data: positionsData } = useNuxtData('positions');

	if (!userData.value) {
		const { data, refresh } = await useAsyncData(
			userDataKey,
			() => getUserById(userId.value as string, true),
			{
				server: true,
				lazy: false,
				immediate: true,
			}
		);
		userData.value = data.value;
		refreshUser.value = refresh;
	}

	if (!departmentsData.value) {
		const { data } = await useAsyncData(
			'departments',
			() => getAllDepartments(),
			{
				server: true,
				lazy: false,
			}
		);
		departmentsData.value = data.value;
	}

	if (!positionsData.value) {
		const { data } = await useAsyncData('positions', () => getAllPositions(), {
			server: true,
			lazy: false,
		});
		positionsData.value = data.value;
	}

	const isLoading = computed(() => {
		return !departmentsData.value || !positionsData.value;
	});

	watch(
		() => userData.value?.user,
		(newUser) => {
			if (newUser) {
				firstName.value = newUser.profile.first_name || '';
				lastName.value = newUser.profile.last_name || '';
				fullName.value = newUser.profile.full_name || '';
				email.value = newUser.email || '';
				dateJoined.value = newUser.created_at
					? new Date(parseInt(newUser.created_at)).toDateString()
					: '';
				avatar.value = newUser.profile.avatar || '';
				selectedDepartment.value.value = newUser.department?.id || '';
				selectedDepartment.value.label = newUser.department?.name || '';
				selectedPosition.value.value = newUser.position?.id || '';
				selectedPosition.value.label = newUser.position?.name || '';

				initialValues.value = {
					firstName: firstName.value,
					lastName: lastName.value,
					selectedDepartment: { ...selectedDepartment.value },
					selectedPosition: { ...selectedPosition.value },
				};
			}
		},
		{ immediate: true }
	);

	watch(
		() => departmentsData.value?.departments,
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
		() => positionsData.value?.positions,
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

	const handleUploadSuccess = async () => {
		const { data } = await useAsyncData(userDataKey, () =>
			getUserById(userId.value, true)
		);

		if (data.value?.user) {
			showSuccessToast('Avatar uploaded successfully');
			avatar.value = data.value.user.profile.avatar;
		}
	};

	const handleDeleteAvatar = async () => {
		try {
			isDeletingAvatar.value = true;
			const { executeDelete } = deleteAvatar(userId.value);
			await executeDelete();
			const { data } = await useAsyncData(userDataKey, () =>
				getUserById(userId.value, true)
			);

			if (data.value?.user) {
				avatar.value = data.value.user.profile.avatar || '';
			}
			showSuccessToast('Avatar deleted successfully');
		} catch (error) {
			showErrorToast('Failed to delete avatar');
		} finally {
			isDeletingAvatar.value = false;
		}
	};

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
			clearNuxtData(userDataKey);

			const { data } = await useAsyncData(userDataKey, () =>
				getUserById(userId.value, true)
			);
			if (data.value?.user) {
				firstName.value = data.value.user.profile.first_name || '';
				lastName.value = data.value.user.profile.last_name || '';
				fullName.value = data.value.user.profile.full_name || '';
				avatar.value = data.value.user.profile.avatar || '';
				selectedDepartment.value.value = data.value.user.department?.id || '';
				selectedDepartment.value.label = data.value.user.department?.name || '';
				selectedPosition.value.value = data.value.user.position?.id || '';
				selectedPosition.value.label = data.value.user.position?.name || '';

				initialValues.value = {
					firstName: firstName.value,
					lastName: lastName.value,
					selectedDepartment: { ...selectedDepartment.value },
					selectedPosition: { ...selectedPosition.value },
				};
			}
			showSuccessToast('Profile updated successfully');
		} catch (error) {
			showErrorToast('Failed to update profile');
		} finally {
			isSubmitting.value = false;
		}
	};
</script>
