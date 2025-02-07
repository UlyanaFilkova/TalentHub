<template>
	<div>
		<button
			v-for="(button, index) in buttons"
			:key="index"
			class="w-full cursor-pointer px-4 py-2 hover:bg-dark-3"
			@click="handleClick(button.event)"
		>
			{{ button.label }}
		</button>
	</div>
</template>

<script setup lang="ts">
	const emit = defineEmits<{
		(event: string, ...args: any[]): void;
	}>();

	const props = defineProps<{
		buttons: { label: string; event: string }[];
	}>();

	const handleClick = (event: string) => {
		emit(event);
	};
</script>
