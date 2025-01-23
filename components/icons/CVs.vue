<template>
	<svg
		:style="{ fill: color }"
		:width="width"
		focusable="false"
		aria-hidden="true"
		viewBox="0 0 24 24"
		data-testid="ContactPageOutlinedIcon"
	>
		<path
			d="M13.17 4 18 8.83V20H6V4zM14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8zm-2 12c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m4 3.43c0-.81-.48-1.53-1.22-1.85-.85-.37-1.79-.58-2.78-.58-.99 0-1.93.21-2.78.58C8.48 15.9 8 16.62 8 17.43V18h8z"
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
