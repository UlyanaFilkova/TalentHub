<template>
	<svg
		:width="width"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		:class="{ 'rotate-180': isToggled }"
		:style="{ stroke: color, transition: 'transform 0.3s ease' }"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M15 19l-7-7 7-7"
		/>
	</svg>
</template>

<script setup lang="ts">
	const props = defineProps<{
		isToggled: boolean;
		color: string;
		width: string;
	}>();
</script>
