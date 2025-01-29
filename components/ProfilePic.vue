<template>
	<div
		class="bg-profilepic-color flex h-28 min-w-28 items-center justify-center rounded-full text-4xl text-background"
	>
		<div class="select-none">{{ firstLetter }}</div>
	</div>
</template>

<script setup lang="ts">
	const props = defineProps<{
		name: string;
	}>();

	const firstLetter = props.name ? props.name.charAt(0).toUpperCase() : '?';
</script>

<style scoped></style>
