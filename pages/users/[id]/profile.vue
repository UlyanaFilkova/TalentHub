<template>
	<div v-if="isLoading || isError" class="flex flex-col items-center gap-16">
		Loading
	</div>
	<div v-else class="flex flex-col items-center gap-16">
		<div class="flex flex-row justify-center gap-14 bg-background">
			<div class="relative">
				<BaseUserPic
					:key="fullName"
					:class="'h-[120px] w-[120px] bg-profilepic-color text-4xl'"
					:name="fullName"
					:photo="avatar"
				/>
				<button
					v-if="avatar"
					:disabled="isDeletingAvatar"
					class="absolute -right-5 -top-5 flex h-10 w-10 items-center justify-center rounded-full text-3xl text-white transition duration-300 hover:bg-sidebar-hover"
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
	} from '~/utils/services/user-service';
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

	const isError = ref<string | undefined>(undefined);
	const isLoading = ref(false);
	const isSubmitting = ref(false);
	const isUploading = ref(false);
	const isDeletingAvatar = ref(false);

	const refetchUser = ref();

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

	const handleUploadSuccess = async () => {
		const result = await refetchUser.value();

		if (result?.data?.user) {
			showSuccessToast('Avatar uploaded successfully');
			avatar.value = result.data.user.profile.avatar;
		}
	};

	const handleDeleteAvatar = async () => {
		try {
			isDeletingAvatar.value = true;
			const { executeDelete } = deleteAvatar(userId.value);
			await executeDelete();

			if (refetchUser.value) {
				const result = await refetchUser.value();
				if (result?.data?.user) {
					avatar.value = result.data.user.profile.avatar || '';
				}
			}
		} catch (error) {
			showErrorToast('Failed to delete avatar');
		} finally {
			isDeletingAvatar.value = false;
		}
	};

	onMounted(() => {
		const {
			user: fetchedUser,
			loading,
			error,
			refetch,
		} = getUserById(userId.value as string);

		refetchUser.value = refetch;

		watchEffect(() => {
			isLoading.value = loading.value;
			isError.value = error.value?.name;
		});

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
				avatar.value = result.data.user.profile.avatar || '';
				selectedDepartment.value.value = result.data.user.department?.id || '';
				selectedDepartment.value.label =
					result.data.user.department?.name || '';
				selectedPosition.value.value = result.data.user.position?.id || '';
				selectedPosition.value.label = result.data.user.position?.name || '';
			}
			showSuccessToast('Profile updated successfully');
		} catch (error) {
			console.error('Error submitting form:', error);
		} finally {
			isSubmitting.value = false;
		}
	};
</script>
