<template>
	<button
		class="flex h-10 w-10 items-center justify-center rounded-[20px] transition duration-300 ease-in-out hover:bg-sidebar-hover"
		@click="onClick"
	>
		<IconsOptions :color="color" width="22px" />
	</button>
</template>

<script setup lang="ts">
	defineProps<{
		color: string;
	}>();

	const emit = defineEmits<{
		(event: 'click'): void;
	}>();

	const onClick = () => {
		emit('click');
	};
</script>
