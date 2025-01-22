<template>
	<button
		class="mt-auto rounded-md px-3 py-2 transition-colors duration-200"
		@click="onToggleSidebar"
	>
		<IconsBackArrow :is-collapsed="isCollapsed" />
	</button>
</template>

<script setup lang="ts">
	const props = defineProps<{
		isCollapsed: boolean;
	}>();

	const emit = defineEmits<{
		(event: 'toggle'): void;
	}>();

	const onToggleSidebar = () => {
		emit('toggle');
	};
</script>
