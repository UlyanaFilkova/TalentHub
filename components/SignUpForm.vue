<template>
	<div>
		<form @submit.prevent="handleSignup">
			<input v-model="form.email" type="email" placeholder="Email" required />
			<input
				v-model="form.password"
				type="password"
				placeholder="Password"
				required
			/>
			<button type="submit">Sign Up</button>
		</form>
		<!--		<p v-if="error">{{ error.message }}</p>-->
		<button @click="redirectLogin">I have an account</button>
	</div>
</template>

<script lang="ts" setup>
	import { useRouter } from '#app';
	import { ref } from 'vue';
	import { signUp } from '~/composables/services/auth/auth-service';

	const form = ref({ email: '', password: '' });
	const router = useRouter();

	const handleSignup = async () => {
		try {
			const data = await signUp(form.value);
			if (data) {
				router.push('/');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const redirectLogin = () => {
		router.push('/auth/login');
	};
</script>

<style scoped>
	/* Ваши стили */
</style>
