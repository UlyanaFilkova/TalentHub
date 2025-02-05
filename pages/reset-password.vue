<template>
	<div>
		<BaseForm
			info-text="Almost done! Now create a new password"
			title="Set a new password"
			@submit="handleSubmit"
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
						:disabled="isSubmitting"
					>
						SUBMIT
					</BaseButton>
				</div>
				<div>
					<NuxtLink to="/auth/login">
						<BaseButton
							variant="text"
							color="secondary"
							type="button"
							class="w-1/2"
						>
							BACK TO LOG IN
						</BaseButton>
					</NuxtLink>
				</div>
			</template>
		</BaseForm>
	</div>
</template>

<script lang="ts" setup>
	import { useRouter } from '#app';
	import { ref } from 'vue';
	import { resetPassword } from '~/utils/services/auth-service';

	definePageMeta({
		layout: 'auth',
	});

	const newPassword = ref('');
	const router = useRouter();
	const route = useRoute();
	const isSubmitting = ref(false);

	const handleSubmit = async () => {
		if (!newPassword.value || isSubmitting.value) return;
		isSubmitting.value = true;
		const token = route.query.token as string;
		try {
			const data = await resetPassword(newPassword.value, token);
			if (data) {
				router.push('/auth/login');
			}
		} finally {
			isSubmitting.value = false;
		}
	};
</script>
