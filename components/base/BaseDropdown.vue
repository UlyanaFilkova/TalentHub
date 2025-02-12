<template>
	<div class="relative w-full min-w-[220px] flex-grow">
		<button
			:id="id"
			type="button"
			class="peer h-12 w-full appearance-none border border-input-border bg-input-background p-3 text-left text-input-text transition-all duration-200 hover:border-input-border focus:border-input-borderFocus focus:outline-none disabled:opacity-50"
			:disabled="disabled"
			@click="isOpen = !isOpen"
		>
			{{ selectedValue!.value === '' ? '' : selectedOption?.label }}
		</button>

		<label
			:class="[
				'pointer-events-none absolute left-0 top-0 text-input-label transition-all duration-200 peer-focus:bg-input-labelBackground peer-focus:text-input-labelFocus',
				selectedValue!.value
					? '-translate-x-0 -translate-y-4 scale-75 bg-input-labelBackground p-1'
					: 'translate-y-0 p-3 peer-focus:-translate-x-0 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:p-1',
			]"
		>
			{{ label }}
		</label>

		<div
			class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-input-label"
		>
			<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
				<path d="M7 10l5 5 5-5z" />
			</svg>
		</div>

		<div
			v-if="isOpen"
			class="absolute z-50 mt-1 w-full -translate-y-[60px] rounded-md bg-dropdown-button-background py-1 shadow-lg"
		>
			<div class="flex max-h-[200px] flex-col overflow-auto">
				<div
					v-for="option in allOptions"
					:key="option.value"
					:class="getOptionClasses(option)"
					@click="selectOption(option)"
				>
					{{ option.label }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	interface Option {
		value: string;
		label: string;
		isSeparator?: boolean;
		disabled?: boolean;
	}

	const props = defineProps({
		id: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			required: true,
		},
		options: {
			type: Array as () => Option[],
			required: true,
		},
		defaultOptionLabel: {
			type: String,
			required: false,
			default: '',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	});

	const selectedValue = defineModel<{ value: string; label: string }>();

	const isOpen = ref(false);

	const selectedOption = computed(() => {
		if (selectedValue.value?.value === '') {
			return { value: '', label: props.defaultOptionLabel };
		}
		return props.options.find(
			(option) => option.value === selectedValue.value?.value
		);
	});

	const allOptions = computed(() =>
		props.defaultOptionLabel
			? [{ value: '', label: props.defaultOptionLabel }, ...props.options]
			: props.options
	);

	const selectOption = (option: Option) => {
		selectedValue.value = option;
		isOpen.value = false;
	};

	const getOptionClasses = (option: Option) => [
		'cursor-pointer px-4 py-2 text-input-text',
		option.isSeparator
			? 'cursor-default bg-sidebar-hover text-sm font-thin text-input-borderFocus'
			: option.value === selectedValue!.value?.value
				? 'bg-dropdown-button-backgroundSelected hover:bg-dropdown-button-backgroundSelectedHover'
				: 'hover:bg-dropdown-button-backgroundHover',
		option.disabled ? 'cursor-default' : '',
	];

	onMounted(() => {
		document.addEventListener('click', (e) => {
			if (!(e.target as HTMLElement)?.closest(`#${props.id}`)) {
				isOpen.value = false;
			}
		});
	});
</script>

<style scroped>
	.overflow-auto::-webkit-scrollbar {
		width: 6px;
		height: 6px;
		background: transparent;
	}

	.overflow-auto::-webkit-scrollbar-thumb {
		background: #000000;
		border-radius: 3px;
	}
</style>
