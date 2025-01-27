<template>
	<div class="relative w-full flex-grow">
		<button
			:id="id"
			type="button"
			class="hover:border-input-borderHover peer h-12 w-full appearance-none border border-input-border bg-input-background p-3 text-left text-input-text transition-all duration-200 focus:border-input-borderFocus focus:outline-none"
			@click="isOpen = !isOpen"
		>
			{{ selectedValue === '' ? '' : selectedOption?.label }}
		</button>

		<label
			:class="[
				'pointer-events-none absolute left-0 top-0 text-input-label transition-all duration-200 peer-focus:bg-input-labelBackground peer-focus:text-input-labelFocus',
				selectedValue
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
			class="bg-dropdown-button-background absolute z-50 mt-1 w-full -translate-y-[60px] rounded-md py-1 shadow-lg"
		>
			<div
				v-for="option in allOptions"
				:key="option.value"
				:class="[
					'cursor-pointer px-4 py-2 text-input-text',
					option.value === selectedValue
						? 'bg-dropdown-button-backgroundSelected hover:bg-dropdown-button-backgroundSelectedHover'
						: 'hover:bg-dropdown-button-backgroundHover',
				]"
				@click="selectOption(option)"
			>
				{{ option.label }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	interface Option {
		value: string | number;
		label: string;
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
			required: true,
		},
	});

	const emit = defineEmits(['selectValue']);

	const isOpen = ref(false);
	const selectedValue = ref<string | number>('');
	const selectedOption = computed(() => {
		if (selectedValue.value === '') {
			return { value: '', label: props.defaultOptionLabel };
		}
		return props.options.find((option) => option.value === selectedValue.value);
	});

	const allOptions = computed(() => [
		{ value: '', label: props.defaultOptionLabel },
		...props.options,
	]);

	const selectOption = (option: Option) => {
		selectedValue.value = option.value;
		isOpen.value = false;
		emit('selectValue', selectedValue.value);
	};

	onMounted(() => {
		selectedValue.value = '';
		emit('selectValue', selectedValue.value);
		document.addEventListener('click', (e) => {
			if (!(e.target as HTMLElement)?.closest(`#${props.id}`)) {
				isOpen.value = false;
			}
		});
	});
</script>
