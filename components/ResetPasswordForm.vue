<template>
	<div>
		<form @submit.prevent="handleSubmit">
			<h1>Reset password</h1>
			<input
				v-model="newPassword"
				type="password"
				placeholder="Password"
				required
			/>

			<button type="submit">Submit</button>
		</form>
		<!--		<p v-if="error">{{ error.message }}</p>-->
		<button @click="redirectLogin">Back to Log in</button>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	import { resetPassword } from '~/composables/services/auth/auth-service';
	import { useRouter, useRoute } from '#app';

	const newPassword = ref('');
	const router = useRouter();
	const route = useRoute();

	const handleSubmit = async () => {
		try {
			const data = await resetPassword(newPassword.value);
			if (data) {
				router.push('/auth/login');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const redirectLogin = () => {
		router.push('/auth/login');
	};

	onMounted(() => {
		const token = route.query.token;
		console.log(token);
		if (token) {
			localStorage.setItem('access', token as string);
		}
	});
</script>

<style scoped>
	/* Ваши стили */
</style>
