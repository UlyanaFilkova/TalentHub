<template>
	<div>
		<form @submit.prevent="handleLogin">
			<input v-model="form.email" type="email" placeholder="Email" required />
			<input
				v-model="form.password"
				type="password"
				placeholder="Password"
				required
			/>
			<button type="submit">Log in</button>
		</form>
		<!--		<p v-if="error">{{ error.message }}</p>-->
		<button @click="redirectForgotPassword">Forgot password</button>
	</div>
</template>

<script lang="ts" setup>
	import { useRouter } from '#app';
	import { ref } from 'vue';
	import { login } from '~/composables/services/auth/auth-service';

	const form = ref({ email: '', password: '' });
	const router = useRouter();

	const handleLogin = async () => {
		try {
			const data = await login(form.value);
			if (data) {
				router.push('/');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const redirectForgotPassword = () => {
		router.push('/auth/forgot-password');
	};
</script>

<style scoped>
	/* Ваши стили */
</style>
