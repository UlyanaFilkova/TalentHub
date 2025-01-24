<template>
	<div
		class="search-bar flex w-80 items-center gap-3 rounded-full border px-3 py-2"
		:class="isFocused ? 'border-active-color' : 'border-low-contrast-color'"
	>
		<IconsSearch width="24px" color="var(--color-active-text)" />
		<input
			v-model="searchQuery"
			type="text"
			:placeholder="placeholder"
			class="flex-grow-1 block w-full border-none bg-transparent text-inactive-color placeholder-inactive-color outline-none focus:ring-0"
			@input="onInput"
			@focus="onFocus"
			@blur="onBlur"
		/>
	</div>
</template>

<script setup lang="ts">
	defineProps({
		placeholder: {
			type: String,
			default: 'Search...',
		},
	});

	const emit = defineEmits(['search']);

	const searchQuery = ref('');

	const isFocused = ref(false);

	const onFocus = () => {
		isFocused.value = true;
	};

	const onBlur = () => {
		isFocused.value = false;
	};

	let debounceTimer: ReturnType<typeof setTimeout> | null = null;

	const onInput = () => {
		if (debounceTimer) {
			clearTimeout(debounceTimer);
		}

		debounceTimer = setTimeout(() => {
			emit('search', searchQuery.value);
		}, 300);
	};
</script>
