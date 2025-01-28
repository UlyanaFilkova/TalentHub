<template>
	<div class="container flex flex-col">
		<label
			for="fileInput"
			class="flex h-24 cursor-pointer items-center justify-center p-2"
			@dragover.prevent
			@drop="handleDrop"
		>
			<div class="flex flex-col items-center justify-center gap-2">
				<div class="flex gap-2 text-xl text-white">
					<component :is="Upload" :color="'white'" width="30px" />
					Upload avatar image
				</div>
				<div class="text-upload-color">png, jpg or gif no more than 0.5MB</div>
			</div>
		</label>
		<input
			id="fileInput"
			ref="fileInput"
			class="container hidden p-2"
			type="file"
			accept="image/*"
			multiple
			@change="handleFileChange"
		/>
	</div>
</template>

<script setup lang="ts">
	import Upload from './icons/UploadIcon.vue';

	const handleDrop = () => {};
	const handleFileChange = () => {};
</script>

<style scoped></style>
