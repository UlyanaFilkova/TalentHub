<template>
	<button v-bind="buttonAttrs" @click="handleClick">
		<slot />
	</button>
</template>

<script setup lang="ts">
	import { buttonColorClasses } from './button.constants';
	const props = defineProps({
		variant: {
			type: String as () => 'contained' | 'outlined' | 'text',
			default: 'contained',
		},
		color: {
			type: String as () => 'primary' | 'secondary',
			default: 'primary',
		},
		type: {
			type: String as () => 'button' | 'submit' | 'reset',
			default: 'button',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	});

	const emit = defineEmits(['click']);

	const computedClasses = computed(() => {
		const baseClass =
			'py-1 text-sm px-4 h-12 min-w-[220px] rounded-3xl container select-none transition-all ease-in duration-150 ';
		const variantClass = buttonColorClasses[props.color][props.variant];
		return props.disabled
			? `${baseClass} ${variantClass} pointer-events-none opacity-50`
			: `${baseClass} ${variantClass} cursor-pointer`;
	});

	const buttonAttrs = computed(() => ({
		type: props.type,
		disabled: props.disabled,
		class: computedClasses.value,
	}));

	const handleClick = (event: Event) => {
		if (!props.disabled) {
			emit('click', event);
		}
	};
</script>
