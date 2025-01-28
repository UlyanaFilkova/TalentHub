<template>
	<div>
		<BaseForm
			info-text="Almost done! Now create a new password"
			title="Set a new password"
			:on-submit="handleSubmit"
		>
			<template #main>
				<BaseInput
					id="password"
					v-model="newPassword"
					type="text"
					placeholder="Enter new password"
					required
					label="New password"
					class="w-screen max-w-[550px]"
				/>
			</template>
			<template #footer>
				<div class="mb-2">
					<BaseButton
						variant="contained"
						:color="newPassword ? 'primary' : 'secondary'"
						type="submit"
						:disabled="!newPassword"
					>
						SUBMIT
					</BaseButton>
				</div>
				<div>
					<BaseButton
						variant="text"
						color="secondary"
						type="button"
						class="w-1/2"
						@click="redirectLogin"
					>
						BACK TO LOG IN
					</BaseButton>
				</div>
			</template>
		</BaseForm>
	</div>
</template>

<script lang="ts" setup>
	import { useRoute, useRouter } from '#app';
	import { ref } from 'vue';
	import { resetPassword } from '~/services/auth/auth-service';

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
