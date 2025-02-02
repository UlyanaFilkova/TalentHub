<template>
	<div class="flex flex-1 items-center justify-center">
		<form
			class="flex w-full max-w-5xl flex-col items-center justify-center"
			@submit.prevent="emit('submit')"
		>
			<div class="mb-10 text-center">
				<h1 class="mb-6 text-4xl text-white">{{ title }}</h1>
				<p class="mt-2 text-base text-white">{{ infoText }}</p>
			</div>
			<div class="space-y-4">
				<slot name="main"></slot>
			</div>
			<div class="mt-14 flex flex-col">
				<slot name="footer"></slot>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
	defineProps<{
		title: string;
		infoText: string;
	}>();

	const emit = defineEmits(['submit']);
</script>
