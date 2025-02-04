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
				<div class="text-gray-10">png or jpg no more than 0.5MB</div>
			</div>
		</label>
		<input
			id="fileInput"
			ref="fileInput"
			class="container hidden p-2"
			type="file"
			accept="image/*"
			@change="handleFileChange"
		/>
	</div>
</template>

<script setup lang="ts">
	import { uploadAvatar } from '~/utils/graphql-services/user-service';
	import { showErrorToast } from '~/utils/toast/toast';
	import Upload from './icons/UploadIcon.vue';
	const props = defineProps<{
		userId: string;
	}>();

	const emit = defineEmits<{
		'upload-success': [];
		'upload-start': [];
		'upload-end': [];
	}>();

	const fileInput = ref<HTMLInputElement | null>(null);

	const processFile = async (file: File) => {
		if (file.size > 512000) {
			showErrorToast('File size should not exceed 0.5MB');
			return;
		}

		if (!['image/png', 'image/jpeg'].includes(file.type)) {
			showErrorToast('Only PNG or JPG files are allowed');
			return;
		}

		const reader = new FileReader();
		reader.onload = async (e) => {
			const base64 = e.target?.result as string;

			try {
				emit('upload-start');

				const { executeUpload } = uploadAvatar({
					userId: props.userId,
					base64,
					size: file.size,
					type: file.type,
				});

				await executeUpload();
				emit('upload-success');
			} catch (error) {
				showErrorToast('Error uploading avatar');
			} finally {
				emit('upload-end');
			}
		};

		reader.readAsDataURL(file);
	};

	const handleFileChange = (event: Event) => {
		const input = event.target as HTMLInputElement;
		if (input.files?.length) {
			processFile(input.files[0]);
		}
	};

	const handleDrop = (event: DragEvent) => {
		event.preventDefault();
		const files = event.dataTransfer?.files;
		if (files?.length) {
			processFile(files[0]);
		}
	};
</script>
