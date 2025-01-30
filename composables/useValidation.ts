import useVuelidate from '@vuelidate/core';
import { minLength, required } from '@vuelidate/validators';
import { computed, ref } from 'vue';

interface ValidationOptions {
	passwordMinLength?: number;
}

export function useValidation(options: ValidationOptions) {
	const form = ref({
		email: '',
		password: '',
	});

	const rules = computed(() => ({
		email: { required },
		password: {
			required,
			...(options.passwordMinLength
				? { minLength: minLength(options.passwordMinLength) }
				: {}),
		},
	}));

	const $v = useVuelidate<{ email: string; password: string }>(rules, form);

	return { form, $v };
}
