<template>
	<div class="relative w-full flex-grow">
		<input
			:id="id"
			v-model="enteredValue"
			:type="type"
			class="peer h-12 w-full min-w-[220px] border border-input-border bg-input-background p-3 text-input-text transition-all duration-200 hover:border-input-borderHover focus:border-input-borderFocus focus:outline-none"
			autocomplete="off"
			@input="onInput"
		/>
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
		<slot name="icon"></slot>
	</div>
</template>

<script setup lang="ts">
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
	});

	const emit = defineEmits(['inputValue']);

	const enteredValue = ref('');

	const onInput = () => {
		emit('inputValue', enteredValue.value);
	};
</script>

<style scoped></style>
