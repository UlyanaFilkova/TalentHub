<script setup lang="ts">
	defineProps<{
		title: string;
		onSubmit: () => void;
		infoText: string;
	}>();
</script>

<template>
	<div class="flex min-h-screen items-center justify-center">
		<form
			class="flex w-screen max-w-5xl flex-col items-center"
			@submit.prevent="onSubmit"
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
