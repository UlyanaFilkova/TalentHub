<template>
	<div>
		<div>
			<AuthTheHeader />
		</div>
		<BaseForm
			info-text="Welcome! Sign up to continue"
			title="Register now"
			:on-submit="handleSignup"
		>
			<template #main>
				<BaseInput
					id="email"
					v-model="form.email"
					type="email"
					placeholder="Email"
					required
					label="Email"
					class="w-screen max-w-[550px]"
				/>
				<BaseInput
					id="password"
					v-model="form.password"
					:type="isPasswordVisible ? 'text' : 'password'"
					placeholder="Password"
					required
					label="Password"
					class="w-screen max-w-[550px]"
				>
					<template #icon>
						<AuthPasswordEyeToggle
							:color="'var(--color-active-text)'"
							@update:password-visibility="togglePasswordVisibility"
						/>
					</template>
				</BaseInput>
			</template>
			<template #footer>
				<div class="mb-2">
					<BaseButton variant="contained" color="primary" type="submit">
						CREATE ACCOUNT
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
						I HAVE AN ACCOUNT
					</BaseButton>
				</div>
			</template>
		</BaseForm>
	</div>
</template>

<script lang="ts" setup>
	import { useRouter } from '#app';
	import { ref } from 'vue';
	import { signUp } from '~/services/auth/auth-service';

	const form = ref({ email: '', password: '' });
	const router = useRouter();
	const isPasswordVisible = ref(false);

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
	const togglePasswordVisibility = (newValue: boolean) => {
		isPasswordVisible.value = newValue;
	};
</script>
