<template>
	<div>
		<button
			class="hover:bg-options-backgroud-hover w-full cursor-pointer px-4 py-2"
			@click="profileClick"
		>
			Profile
		</button>
		<button
			class="hover:bg-options-backgroud-hover w-full cursor-pointer px-4 py-2"
			@click="updateClick"
		>
			Update user
		</button>
		<button
			class="hover:bg-options-backgroud-hover w-full cursor-pointer px-4 py-2"
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
