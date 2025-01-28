<template>
	<button
		class="flex h-10 w-10 items-center justify-center rounded-[20px] transition duration-300 ease-in-out hover:bg-sidebar-hover"
		@click="onClick"
	>
		<IconsBackArrow :is-toggled="isToggled" :color="color" width="20px" />
	</button>
</template>

<script setup lang="ts">
	defineProps<{
		isToggled: boolean;
		color: string;
	}>();

	const emit = defineEmits<{
		(event: 'click'): void;
	}>();

	const onClick = () => {
		emit('click');
	};
</script>
