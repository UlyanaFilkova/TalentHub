<template>
	<BaseButton
		:variant="variant"
		:color="color"
		:disabled="disabled"
		:type="type"
		class="relative flex max-w-[284px] items-center justify-start gap-4 overflow-hidden"
	>
		<div
			class="bg-gray-6 relative left-0 top-0 h-1 w-32 rounded-2xl"
			:class="progressBackgroundClass"
		>
			<div
				class="h-full rounded-2xl transition-all duration-300"
				:class="progressColorClass"
				:style="{ width: `${progress}%` }"
			/>
		</div>

		<div class="relative flex w-full items-center justify-start text-base">
			<slot />
		</div>
	</BaseButton>
</template>

<script setup lang="ts">
	const props = defineProps({
		progress: {
			type: Number,
			default: 0,
			validator: (value: number) => value >= 0 && value <= 100,
		},
		variant: {
			type: String as () => 'contained' | 'outlined' | 'text',
			default: 'text',
		},
		color: {
			type: String as () => 'primary' | 'secondary',
			default: 'secondary',
		},
		type: {
			type: String as () => 'button' | 'submit' | 'reset',
			default: 'button',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	});

	const progressColorClass = computed(() => {
		if (props.progress > 80) return 'bg-red-500';
		if (props.progress > 60) return 'bg-yellow-500';
		if (props.progress > 40) return 'bg-green-500';
		if (props.progress > 20) return 'bg-blue-500';
		return 'bg-gray-400';
	});

	const progressBackgroundClass = computed(() => {
		if (props.progress > 80) return 'bg-red-500/40';
		if (props.progress > 60) return 'bg-yellow-500/40';
		if (props.progress > 40) return 'bg-green-500/40';
		if (props.progress > 20) return 'bg-blue-500/40';
		return 'bg-gray-400/40';
	});
</script>
