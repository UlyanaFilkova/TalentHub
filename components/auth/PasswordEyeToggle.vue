<template>
	<div>
		<IconsClosedEye
			v-if="!isPasswordVisible"
			:color="color"
			class="absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 cursor-pointer"
			@click="toggleVisibility"
		/>
		<IconsOpenEye
			v-if="isPasswordVisible"
			:color="color"
			class="absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 cursor-pointer"
			@click="toggleVisibility"
		/>
	</div>
</template>

<script setup lang="ts">
	import { defineEmits, ref } from 'vue';

	const props = defineProps({
		color: {
			type: String,
			required: true,
		},
	});

	const emit = defineEmits(['update:passwordVisibility']);

	const isPasswordVisible = ref(false);

	const toggleVisibility = () => {
		isPasswordVisible.value = !isPasswordVisible.value;
		emit('update:passwordVisibility', isPasswordVisible.value);
	};
</script>
