<template>
	<tr class="w-full text-sm text-white">
		<td
			v-for="(item, key) in displayedFields"
			:key="key"
			:class="['custom-column py-4 pr-8', displayedFields[key].class]"
		>
			{{ item.value }}
		</td>
		<td class="py-4 pr-2">
			<div
				ref="optionsContainer"
				class="relative"
				@mouseenter="showOptions"
				@mouseleave="hideOptions"
			>
				<ButtonsOptions is-toggled color="var(--color-white)" />

				<TableOptions
					v-if="optionsVisible"
					class="absolute right-0 z-10 mt-2 w-28 rounded-lg border-dark-4 bg-dark-4 py-2 shadow-lg"
					:class="optionsPosition"
					:buttons="[
						{ label: 'Details', event: 'detailsClick' },
						{ label: 'Delete CV', event: 'deleteClick' },
					]"
					@details-click="openDetails"
					@delete-click="deleteCV"
				/>
			</div>
		</td>
	</tr>
	<tr
		v-if="props.row.description"
		class="w-full border-b border-gray-8 font-medium text-gray-3"
	>
		<td colspan="4" class="pr-8">
			<div class="description mb-3">{{ props.row.description }}</div>
		</td>
	</tr>
</template>

<script setup lang="ts">
	const router = useRouter();
	const props = defineProps<{
		row: {
			id: number;
			name: string;
			education: string;
			description: string;
			email: string;
			link: string;
		};
		tableContainer: HTMLElement | null;
	}>();

	const optionsVisible = ref(false);
	const optionsContainer = ref<HTMLElement | null>(null);
	const optionsPosition = ref('top-0');

	const displayedFields = computed(() => {
		return {
			name: { value: props.row.name, class: 'small-column' },
			education: { value: props.row.education, class: 'medium-column' },
			email: { value: props.row.email, class: 'big-column' },
		};
	});

	const showOptions = async () => {
		optionsVisible.value = true;
		await nextTick();
		if (optionsContainer.value && props.tableContainer) {
			const rect = optionsContainer.value.getBoundingClientRect();
			const tableRect = props.tableContainer.getBoundingClientRect();
			const spaceBelow = tableRect.bottom - rect.bottom;

			optionsPosition.value = spaceBelow < 150 ? 'bottom-0' : 'top-0';
		}
	};

	const hideOptions = () => {
		optionsVisible.value = false;
	};

	const openDetails = () => {
		router.push(`/cvs/${props.row.id}/details`);
	};

	const deleteCV = () => {};
</script>

<style scoped>
	.small-column {
		min-width: 160px;
		max-width: 200px;
	}

	.medium-column {
		min-width: 170px;
		max-width: 200px;
	}

	.big-column {
		min-width: 255px;
		max-width: 260px;
	}

	.custom-column {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.description {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		width: 100%;
		word-wrap: break-word;
		white-space: normal;
	}
</style>
