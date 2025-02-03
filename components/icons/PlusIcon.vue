<template>
	<svg
		:style="{ fill: color }"
		:width="width"
		focusable="false"
		aria-hidden="true"
		viewBox="0 0 24 24"
	>
		<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
	</svg>
</template>

<script setup lang="ts">
	interface Props {
		color: string;
		width: string;
	}

	defineProps<Props>();
</script>
