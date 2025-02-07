<template>
	<div
		class="relative flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full"
	>
		<img
			v-if="photo"
			:src="photo"
			alt="photo"
			class="block h-full w-full flex-shrink-0 object-cover"
		/>
		<div
			v-else
			class="text-dark-1 flex h-full w-full items-center justify-center text-xl"
		>
			{{ firstLetter }}
		</div>
	</div>
</template>

<script setup lang="ts">
	const firstLetter = ref('');
	const props = defineProps<{
		name: string;
		photo?: string;
	}>();

	firstLetter.value = props.name ? props.name.charAt(0).toUpperCase() : '?';
</script>
