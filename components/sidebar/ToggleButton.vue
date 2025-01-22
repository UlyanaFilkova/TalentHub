<template>
	<button
		class="mt-auto flex h-10 w-10 items-center justify-center rounded-[20px] transition duration-300 ease-in-out hover:bg-sidebar-hover"
		@click="onToggleSidebar"
	>
		<IconsBackArrow :is-toggled="isToggled" :color="color" width="20px" />
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

	const color = 'var(--color-active-text)';
</script>
