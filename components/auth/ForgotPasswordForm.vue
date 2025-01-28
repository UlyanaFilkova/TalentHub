<template>
	<div>
		<BaseForm
			info-text="We will sent you an email with further instructions"
			title="Forgot password"
			:on-submit="handleReset"
		>
			<template #main>
				<BaseInput
					id="email"
					v-model="email"
					type="email"
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
						:disabled="!email"
					>
						RESET PASSWORD
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
						CANCEL
					</BaseButton>
				</div>
			</template>
		</BaseForm>
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
