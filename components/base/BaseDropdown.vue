<template>
	<div class="relative w-full min-w-[220px] flex-grow">
		<button
			:id="id"
			type="button"
			class="border-gray-6 bg-dark-1 hover:border-gray-6 focus:border-red-5 peer h-12 w-full appearance-none border p-3 text-left text-white transition-all duration-200 focus:outline-none disabled:opacity-50"
			:disabled="disabled"
			@click="isOpen = !isOpen"
		>
			{{ selectedValue?.value === '' ? '' : selectedOption?.label }}
		</button>

		<label
			:class="[
				'text-gray-2 peer-focus:bg-dark-1 peer-focus:text-red-5 pointer-events-none absolute left-0 top-0 transition-all duration-200',
				selectedValue?.value
					? 'bg-dark-1 -translate-x-0 -translate-y-4 scale-75 p-1'
					: 'translate-y-0 p-3 peer-focus:-translate-x-0 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:p-1',
			]"
		>
			{{ label }}
		</label>

		<div
			class="text-gray-2 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
		>
			<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
				<path d="M7 10l5 5 5-5z" />
			</svg>
		</div>

		<div
			v-if="isOpen"
			class="bg-dark-5 absolute z-50 mt-1 w-full -translate-y-[60px] rounded-md py-1 shadow-lg"
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

	const selectedValue = defineModel<{ value: string; label: string } | null>();

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
		'cursor-pointer px-4 py-2 text-white',
		option.isSeparator
			? 'cursor-default bg-dark-4 text-sm font-thin text-red-5'
			: option.value === selectedValue?.value?.value
				? 'bg-red-3 hover:bg-red-4'
				: 'hover:bg-dark-1',
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
