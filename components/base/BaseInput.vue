<template>
	<div class="relative w-full flex-grow">
		<input
			:id="id"
			v-model="enteredValue"
			:type="type"
			class="border-gray-6 bg-dark-1 focus:border-red-5 peer h-12 w-full min-w-[220px] border p-3 text-white transition-all duration-200 hover:border-white focus:outline-none"
			:autocomplete="autocomplete"
			:placeholder="enteredValue || isFocused ? placeholder : ''"
			@focus="isFocused = true"
			@blur="isFocused = !!enteredValue"
			@input="onInput"
		/>
		<label
			:class="[
				'text-gray-2 peer-focus:bg-dark-1 peer-focus:text-red-5 pointer-events-none absolute left-0 top-0 transition-all duration-200',
				enteredValue
					? 'bg-dark-1 -translate-x-0 -translate-y-4 scale-75 p-1'
					: 'translate-y-0 p-3 peer-focus:-translate-x-0 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:p-1',
			]"
		>
			{{ label }}
		</label>
		<slot name="icon"></slot>
	</div>
</template>

<script setup lang="ts">
	const enteredValue = defineModel<string>();

	const props = defineProps({
		id: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			default: 'text',
		},
		placeholder: { type: String, default: '' },
		autocomplete: { type: String, default: 'off' },
	});

	const emit = defineEmits(['inputValue']);

	const onInput = () => {
		emit('inputValue', enteredValue.value);
	};
	const isFocused = ref(false);
</script>
