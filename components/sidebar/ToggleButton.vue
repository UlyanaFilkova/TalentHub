<template>
	<button
		class="mt-auto w-min rounded-md px-3 py-2 transition-colors duration-200"
		@click="onToggleSidebar"
	>
		<IconsBackArrow :is-toggled="isToggled" />
	</button>
</template>

<script setup lang="ts">
	const props = defineProps<{
		isToggled: boolean;
	}>();

	const emit = defineEmits<{
		(event: 'toggle'): void;
	}>();

	const onToggleSidebar = () => {
		emit('toggle');
	};
</script>
