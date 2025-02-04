<template>
	<Teleport to="body">
		<div
			v-if="isOpen"
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
			@mousedown="handleBackdropClick"
		>
			<div class="bg-dark-1 w-full max-w-[600px] rounded p-6" @mousedown.stop>
				<div class="mb-6 flex items-center justify-between">
					<h2 class="text-xl font-normal text-white">{{ title }}</h2>
					<button
						class="hover:bg-dark-4 -right-5 -top-5 flex h-10 w-10 items-center justify-center rounded-full text-3xl text-white transition duration-300"
						@click="handleCancel"
					>
						<span
							class="relative -top-[2px] flex h-full w-full items-center justify-center font-light leading-none"
						>
							×
						</span>
					</button>
				</div>
				<form @submit.prevent="handleConfirm">
					<div class="flex flex-col gap-8">
						<slot></slot>
					</div>

					<div class="mt-8 flex justify-end gap-4">
						<BaseButton
							variant="outlined"
							color="secondary"
							class="max-w-[220px]"
							@click="handleCancel"
						>
							{{ cancelText }}
						</BaseButton>
						<BaseButton
							variant="contained"
							color="primary"
							:type="'submit'"
							:disabled="!hasChanges"
							class="max-w-[220px]"
						>
							{{ confirmText }}
						</BaseButton>
					</div>
				</form>
			</div>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
	const props = defineProps({
		isOpen: {
			type: Boolean,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		cancelText: {
			type: String,
			default: 'CANCEL',
		},
		confirmText: {
			type: String,
			default: 'CONFIRM',
		},
		hasChanges: {
			type: Boolean,
			default: false,
		},
	});

	const emit = defineEmits<{
		(e: 'cancel' | 'confirm'): void;
		(e: 'update:isOpen', value: boolean): void;
	}>();

	const handleCancel = () => {
		emit('cancel');
		emit('update:isOpen', false);
	};

	const handleConfirm = () => {
		emit('confirm');
		emit('update:isOpen', false);
	};
	const handleBackdropClick = (e: MouseEvent) => {
		if (e.target === e.currentTarget) {
			emit('update:isOpen', false);
		}
	};
</script>
