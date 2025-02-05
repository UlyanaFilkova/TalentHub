<template>
	<div class="flex min-h-screen flex-col">
		<AuthTheHeader />
		<div class="flex flex-1 items-center justify-center">
			<BaseForm
				info-text="Welcome! Sign up to continue"
				title="Register now"
				@submit="handleSignup"
			>
				<template #main>
					<BaseInput
						id="email"
						v-model="form.email"
						type="text"
						placeholder="example@mail.com"
						required
						label="Email"
						class="w-screen max-w-[550px]"
						autocomplete="on"
					/>
					<span v-if="$v.email.$error" class="text-error-text-color">
						Required field
					</span>
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
					<span>
						<span
							v-if="$v.password.$error && !$v.password.$model"
							class="text-error-text-color"
						>
							Required field
						</span>
						<span
							v-if="
								$v.password.$dirty &&
								$v.password.$model &&
								$v.password.minLength.$invalid
							"
							class="text-error-text-color"
						>
							Password must be at least 6 characters long
						</span>
					</span>
				</template>
				<template #footer>
					<div class="mb-2">
						<BaseButton
							variant="contained"
							color="primary"
							type="submit"
							:disabled="isSubmitting"
						>
							CREATE ACCOUNT
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
								I HAVE AN ACCOUNT
							</BaseButton>
						</NuxtLink>
					</div>
				</template>
			</BaseForm>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { useRouter } from '#app';
	import { ref } from 'vue';
	import { useAuthValidation } from '~/composables/useAuthValidation';
	import { signUp } from '~/utils/graphql-services/auth-service';

	const router = useRouter();
	const isPasswordVisible = ref(false);
	const isSubmitting = ref(false);

	const { form, $v } = useAuthValidation({ passwordMinLength: 6 });

	const handleSignup = async () => {
		isSubmitting.value = true;
		await $v.value.$validate();
		if ($v.value.$error) {
			isSubmitting.value = false;
			return;
		}
		try {
			const data = await signUp(form.value);
			if (data) {
				router.push('/users');
			}
		} finally {
			isSubmitting.value = false;
		}
	};
	const togglePasswordVisibility = (newValue: boolean) => {
		isPasswordVisible.value = newValue;
	};
</script>
