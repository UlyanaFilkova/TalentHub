<template>
	<div
		class="search-bar flex w-80 items-center gap-3 rounded-full border px-3 py-2"
		:class="isFocused ? 'border-white' : 'border-gray-5'"
	>
		<IconsSearch width="24px" color="var(--color-white)" />
		<input
			v-model="searchQuery"
			type="text"
			:placeholder="placeholder"
			class="flex-grow-1 block w-full border-none bg-transparent text-gray-1 placeholder-gray-1 outline-none focus:ring-0"
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

	const emit = defineEmits(['update:modelValue', 'search']);

	const searchQuery = ref('');

	const isFocused = ref(false);

	let debounceTimer: ReturnType<typeof setTimeout> | null = null;

	const onInput = () => {
		if (debounceTimer) {
			clearTimeout(debounceTimer);
		}

		debounceTimer = setTimeout(() => {
			emit('update:modelValue', searchQuery.value);
			emit('search', searchQuery.value);
		}, 300);
	};

	const onFocus = () => {
		isFocused.value = true;
	};

	const onBlur = () => {
		isFocused.value = false;
	};
</script>
