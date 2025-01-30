<template>
	<button v-bind="buttonAttrs" @click="handleClick">
		<slot />
	</button>
</template>

<script setup lang="ts">
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

	const colorClasses: Record<
		'primary' | 'secondary',
		Record<'contained' | 'outlined' | 'text', string>
	> = {
		primary: {
			contained:
				'bg-button-primary-contained-background text-button-primary-contained-text hover:bg-button-primary-contained-hover shadow-md',
			outlined:
				'border border-button-primary-outlined-border/50 hover:border-button-primary-outlined-borderHover text-button-primary-outlined-text bg-button-primary-outlined-background/0 hover:bg-button-primary-outlined-background/10',
			text: 'text-button-primary-text-text bg-button-primary-text-background/0 hover:bg-button-primary-text-background/10',
		},
		secondary: {
			contained:
				'bg-button-secondary-contained-background text-button-secondary-contained-text hover:bg-button-secondary-contained-hover shadow-md',
			outlined:
				'border border-button-secondary-outlined-border/50 hover:border-button-secondary-outlined-borderHover/100 hover:bg-button-secondary-outlined-background/5 text-button-secondary-outlined-text',
			text: 'text-button-secondary-text-text bg-button-secondary-text-background/0 hover:bg-button-secondary-text-background/10',
		},
	};

	const computedClasses = computed(() => {
		const baseClass =
			'py-1 text-sm px-4 h-12 min-w-[220px] rounded-3xl container select-none transition-all ease-in duration-150 ';
		const variantClass = colorClasses[props.color][props.variant];
		let finalAppliedClass = `${baseClass} ${variantClass}`;
		if (props.disabled) {
			finalAppliedClass += ' pointer-events-none opacity-50';
		} else {
			finalAppliedClass += ' cursor-pointer';
		}

		return finalAppliedClass;
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
