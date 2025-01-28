<template>
	<svg
		:style="{ fill: color }"
		:width="width"
		focusable="false"
		aria-hidden="true"
		viewBox="0 0 24 24"
	>
		<path
			d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"
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
