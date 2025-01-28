<template>
	<div>
		<form @submit.prevent="handleReset">
			<input v-model="email" type="email" placeholder="Email" required />

			<button type="submit">Reset password</button>
		</form>
		<!--		<p v-if="error">{{ error.message }}</p>-->
		<button @click="redirectLogin">Cancel</button>
	</div>
</template>

<script lang="ts" setup>
	import { useRouter } from '#app';
	import { ref } from 'vue';
	import { forgotPassword } from '~/services/auth/auth-service';

	const email = ref('');
	const router = useRouter();

	const handleReset = async () => {
		try {
			const data = await forgotPassword(email.value);
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
</script>

<style scoped>
	/* Ваши стили */
</style>
