<template>
	<div class="flex flex-col items-center gap-16">
		<div class="flex flex-row justify-center gap-14 bg-background">
			<ProfilePic name="aboba" />
			<FileUpload />
		</div>
		<div class="flex flex-col items-center justify-center">
			<h5 class="mb-2 text-2xl text-white">abba</h5>
			<!-- <p class="text-upload-color">{{ user?.email }}</p> -->
			<p class="text-white">A member since 20.12.2024</p>
		</div>
		<form>form</form>
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
