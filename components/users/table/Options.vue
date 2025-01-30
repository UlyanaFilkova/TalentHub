<template>
	<div>
		<button
			class="w-full cursor-pointer px-4 py-2 hover:bg-options-backgroud-hover"
			@click="profileClick"
		>
			Profile
		</button>
		<button
			class="w-full cursor-pointer px-4 py-2 hover:bg-options-backgroud-hover"
			@click="updateClick"
		>
			Update user
		</button>
		<button
			class="w-full cursor-pointer px-4 py-2 hover:bg-options-backgroud-hover"
			@click="deleteClick"
		>
			Delete user
		</button>
	</div>
</template>
<script setup lang="ts">
	const emit = defineEmits<{
		(e: 'profileClick' | 'updateClick' | 'deleteClick'): void;
	}>();

	const profileClick = () => {
		emit('profileClick');
	};

	const updateClick = () => {
		emit('updateClick');
	};

	const deleteClick = () => {
		emit('deleteClick');
	};
</script>
