<template>
	<div class="relative w-full flex-grow">
		<textarea
			:id="id"
			ref="textareaRef"
			v-model="enteredValue"
			class="peer h-auto w-full min-w-[220px] resize-none overflow-hidden border border-input-border bg-input-background p-3 text-input-text transition-all duration-200 hover:border-input-borderHover focus:border-input-borderFocus focus:outline-none"
			:placeholder="enteredValue || isFocused ? placeholder : ''"
			:label="label"
			:rows="rows"
			@focus="isFocused = true"
			@blur="isFocused = !!enteredValue"
			@input="autoResize"
		></textarea>
		<label
			:class="[
				'pointer-events-none absolute left-0 top-0 text-input-label transition-all duration-200 peer-focus:bg-input-labelBackground peer-focus:text-input-labelFocus',
				enteredValue
					? '-translate-x-0 -translate-y-4 scale-75 bg-input-labelBackground p-1'
					: 'translate-y-0 p-3 peer-focus:-translate-x-0 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:p-1',
			]"
		>
			{{ label }}
		</label>
	</div>
</template>

<script setup lang="ts">
	import { defineProps } from 'vue';

	defineProps<{
		id: string;
		label: string;
		placeholder?: string;
		rows: number;
	}>();
	const isFocused = ref(false);
	const enteredValue = defineModel<string>();
	const textareaRef = ref<HTMLTextAreaElement | null>(null);

	const autoResize = () => {
		if (textareaRef.value) {
			textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
		}
	};

	watch(enteredValue, () => {
		nextTick(() => {
			autoResize();
		});
	});
</script>
