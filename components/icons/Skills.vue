<template>
	<svg
		:style="{ fill: color }"
		:width="width"
		focusable="false"
		aria-hidden="true"
		viewBox="0 0 24 24"
		data-testid="TrendingUpIcon"
	>
		<path
			d="m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"
		></path>
	</svg>
</template>

<script setup lang="ts">
	interface Props {
		color: string;
		width: string;
	}

	defineProps<Props>();
</script>
