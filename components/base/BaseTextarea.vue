<template>
	<div class="relative w-full flex-grow">
		<textarea
			:id="id"
			ref="textareaRef"
			v-model="enteredValue"
			class="peer h-auto w-full min-w-[220px] resize-none overflow-hidden border border-gray-6 bg-dark-1 p-3 text-white transition-all duration-200 hover:border-white focus:border-red-5 focus:outline-none"
			:placeholder="enteredValue || isFocused ? placeholder : ''"
			:label="label"
			:rows="rows"
			@focus="isFocused = true"
			@blur="isFocused = !!enteredValue"
			@input="autoResize"
		></textarea>
		<label
			:class="[
				'pointer-events-none absolute left-0 top-0 text-gray-2 transition-all duration-200 peer-focus:bg-dark-1 peer-focus:text-red-5',
				enteredValue
					? '-translate-x-0 -translate-y-4 scale-75 bg-dark-1 p-1'
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
