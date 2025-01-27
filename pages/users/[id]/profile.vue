<template>
	<div class="flex flex-col items-center gap-16">
		<div class="flex flex-row justify-center gap-14 bg-background">
			<ProfilePic name="aboba" />
			<FileUpload />
		</div>
		<div class="flex flex-col items-center justify-center">
			<h5 class="font- font-me mb-2 text-2xl font-light text-white">abba</h5>
			<p class="text-upload-color">eshkere@gmail.com</p>
			<p class="text-white">A member since 20.12.2024</p>
		</div>
		<form class="grid w-full max-w-3xl grid-cols-2 gap-x-8 gap-y-9">
			<BaseInput
				id="firstName"
				label="First Name"
				@input-value="updateFirstName"
			/>
			<BaseInput
				id="lastName"
				label="Last Name"
				@input-value="updateLastName"
			/>

			<BaseDropdown
				id="department"
				label="Department"
				:options="departments"
				default-option-label="Select Department"
				@select-value="updateDepartment"
			/>
			<BaseDropdown
				id="position"
				label="Position"
				:options="positions"
				default-option-label="Select Position"
				@select-value="updatePosition"
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
	// import { getUserById } from '~/composables/services/user/user-service';

	definePageMeta({
		layout: 'user-profile',
	});
	const route = useRoute();
	const userId = ref(route.params.id);
	console.log('id', userId.value);
	// const { user, loading, error } = getUserById(userId.value as string);
	// watch(
	// 	() => route.params.id,
	// 	(newUserId) => {
	// 		if (newUserId !== userId.value) {
	// 			userId.value = newUserId;
	// 			const { user: newUser } = getUserById(userId.value as string);
	// 			user.value = newUser.value;
	// 		}
	// 	}
	// );
</script>

<style scoped></style>
