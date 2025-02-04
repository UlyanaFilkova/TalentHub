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
			contained: 'bg-red-5 text-white hover:bg-red-2 shadow-md',
			outlined:
				'border border-red-rgb/50 hover:border-red-5 text-red-5 bg-red-rgb/0 hover:bg-red-rgb/10',
			text: 'text-red-5 bg-red-rgb/0 hover:bg-red-rgb/10',
		},
		secondary: {
			contained: 'bg-gray-8 text-white hover:bg-gray-9 shadow-md',
			outlined:
				'border border-gray-rgb/50 hover:border-gray-rgb/100 hover:bg-gray-rgb/5 text-gray-3',
			text: 'text-gray-7 bg-gray-rgb/0 hover:bg-gray-rgb/10',
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
