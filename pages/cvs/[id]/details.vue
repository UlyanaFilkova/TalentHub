<template>
	<div class="mx-auto max-w-4xl">
		<div class="mb-10">
			<BaseInput id="name" v-model="name" label="Name" type="text" />
		</div>
		<div class="mb-10">
			<BaseInput
				id="education"
				v-model="education"
				label="Education"
				type="text"
			/>
		</div>
		<div class="mb-10">
			<BaseTextarea
				id="description"
				v-model="description"
				label="Description"
				:rows="6"
			/>
		</div>
		<div class="flex justify-end">
			<BaseButton
				type="button"
				variant="contained"
				color="primary"
				class="max-w-md"
				:disabled="!hasChanges"
			>
				UPDATE
			</BaseButton>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { getCvById } from '~/services/cv';

	definePageMeta({
		layout: 'cv',
	});

	const route = useRoute();
	const cvId = ref(route.params.id as string);

	const initialValues = ref({
		name: '',
		education: '',
		description: '',
	});

	const name = ref('');
	const education = ref('');
	const description = ref('');

	const hasChanges = computed(() => {
		return (
			name.value !== initialValues.value.name ||
			education.value !== initialValues.value.education ||
			description.value !== initialValues.value.description
		);
	});

	const cvDataKey = `cv-${cvId.value}`;
	const refreshCv = ref();

	const { data: cvData } = useNuxtData(cvDataKey);

	if (!cvData.value) {
		const { data, refresh } = await useAsyncData(
			cvDataKey,
			() => getCvById(cvId.value as string),
			{
				server: true,
				lazy: false,
				immediate: true,
			}
		);
		cvData.value = data.value;
		refreshCv.value = refresh;
	}

	watch(
		() => cvData.value?.cv,
		(newCv) => {
			if (newCv) {
				name.value = newCv.name || '';
				education.value = newCv.education || '';
				description.value = newCv.description || '';
				initialValues.value = {
					name: name.value,
					education: education.value,
					description: education.value,
				};
			}
		},
		{ immediate: true }
	);
</script>
