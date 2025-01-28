<template>
	<div>
		<div>
			<AuthTheHeader />
		</div>
		<BaseForm
			info-text="Hello again! Log in to continue"
			title="Welcome back"
			:on-submit="handleLogin"
		>
			<template #main>
				<BaseInput
					id="email"
					v-model="form.email"
					type="email"
					placeholder="example@mail.com"
					required
					label="Email"
					class="w-screen max-w-[550px]"
					autocomplete="on"
				/>
				<BaseInput
					id="password"
					v-model="form.password"
					:type="isPasswordVisible ? 'text' : 'password'"
					placeholder="Enter your password"
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
						LOG IN
					</BaseButton>
				</div>
				<div>
					<BaseButton
						variant="text"
						color="secondary"
						type="button"
						class="w-1/2"
						@click="redirectForgotPassword"
					>
						FORGOT PASSWORD
					</BaseButton>
				</div>
			</template>
		</BaseForm>
	</div>
</template>

<script lang="ts" setup>
	import { useRouter } from '#app';
	import { ref } from 'vue';
	import { login } from '~/services/auth/auth-service';

	const form = ref({ email: '', password: '' });
	const router = useRouter();
	const isPasswordVisible = ref(false);

	const handleLogin = async () => {
		const data = await login(form.value);
		console.log('handleLogin вызван', form.value);
		if (data) {
			router.push('/');
		}
	};

	const redirectForgotPassword = () => {
		router.push('/auth/forgot-password');
	};
	const togglePasswordVisibility = (newValue: boolean) => {
		isPasswordVisible.value = newValue;
	};
</script>
