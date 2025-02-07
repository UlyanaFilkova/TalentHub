<template>
	<div>
		<BaseForm
			info-text="We will sent you an email with further instructions"
			title="Forgot password"
			@submit="handleReset"
		>
			<template #main>
				<BaseInput
					id="email"
					v-model="email"
					type="text"
					placeholder="example@mail.com"
					required
					label="Email"
					class="w-screen max-w-[550px]"
					autocomplete="on"
				/>
			</template>
			<template #footer>
				<div class="mb-2">
					<BaseButton
						variant="contained"
						:color="email ? 'primary' : 'secondary'"
						type="submit"
						:disabled="isSubmitting"
					>
						RESET PASSWORD
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
							CANCEL
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
	import { forgotPassword } from '~/services/auth';

	const email = ref('');
	const isSubmitting = ref(false);
	const router = useRouter();

	const handleReset = async () => {
		if (!email.value || isSubmitting.value) return;
		isSubmitting.value = true;
		try {
			const data = await forgotPassword(email.value);
			if (data) {
				router.push('/auth/login');
			}
		} finally {
			isSubmitting.value = false;
		}
	};
</script>
