<template>
	<div
		ref="tableContainer"
		class="max-h-[calc(100vh-0.75rem-90px)] w-full overflow-y-auto"
		@scroll="handleScroll"
	>
		<table v-if="isDataLoaded" class="w-full table-auto overflow-x-auto">
			<TableHead
				:headers="headers"
				:sort-key="sortKey"
				:sort-order="sortOrder"
				@sort="handleSort"
			/>
			<tbody>
				<component
					:is="rowComponent"
					v-for="row in displayedData"
					:key="row.id"
					:row="row"
					:table-container="tableContainer"
				/>
			</tbody>
		</table>
	</div>
</template>

<script setup lang="ts">
	import TableCvRow from '@/components/table/CvRow.vue';
	import TableUserRow from '@/components/table/UserRow.vue';
	const props = defineProps<{
		headers: { key: string; label: string; isSortable: boolean }[];
		rowsData: Record<string, any>[];
		searchQuery?: string;
		rowComponent: 'TableUserRow' | 'TableCvRow';
	}>();

	const isDataLoaded = ref(false);
	const tableContainer = ref<HTMLElement | null>(null);
	const sortKey = ref<string | null>(null);
	const sortOrder = ref<'asc' | 'desc'>('asc');
	const itemsPerPage = 10;
	const loadedCount = ref(itemsPerPage);
	const isLoading = ref(false);

	const displayedData = ref<Record<string, any>[]>([]);

	const rowComponent = computed(() => {
		if (props.rowComponent === 'TableUserRow') {
			return TableUserRow;
		} else if (props.rowComponent === 'TableCvRow') {
			return TableCvRow;
		}
		return null;
	});

	const sortedData = computed(() => {
		if (!sortKey.value) return [...props.rowsData];

		const collator = new Intl.Collator('en', { sensitivity: 'base' });

		return [...props.rowsData].sort((a, b) => {
			const aValue = a[sortKey.value as keyof typeof a];
			const bValue = b[sortKey.value as keyof typeof b];

			const aStr = (aValue || '').toString().toLowerCase();
			const bStr = (bValue || '').toString().toLowerCase();

			if (aStr === '' && bStr !== '') {
				return 1;
			}
			if (bStr === '' && aStr !== '') {
				return -1;
			}

			if (aStr === 'n/a' && bStr !== 'n/a') {
				return 1;
			}
			if (bStr === 'n/a' && aStr !== 'n/a') {
				return -1;
			}

			return sortOrder.value === 'asc'
				? collator.compare(aStr, bStr)
				: collator.compare(bStr, aStr);
		});
	});

	const updateDisplayedData = () => {
		displayedData.value = sortedData.value.slice(0, loadedCount.value);
	};

	const handleSort = async (key: string, order: 'asc' | 'desc') => {
		sortKey.value = key;
		sortOrder.value = order;
	};

	const handleScroll = () => {
		if (!tableContainer.value || isLoading.value) return;

		const { scrollTop, scrollHeight, clientHeight } = tableContainer.value;
		const isBottom = scrollTop + clientHeight >= scrollHeight - 50;

		if (isBottom && loadedCount.value < props.rowsData.length) {
			isLoading.value = true;
			loadedCount.value += itemsPerPage;
			isLoading.value = false;
		}
	};

	onMounted(() => {
		isDataLoaded.value = true;
	});

	watch([sortedData, loadedCount], updateDisplayedData, { immediate: true });
</script>
