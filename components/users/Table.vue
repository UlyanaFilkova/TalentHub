<template>
	<div class="max-h-full w-full">
		<table class="w-full table-auto overflow-x-auto border">
			<thead class="sticky top-0">
				<tr>
					<th
						v-for="header in headers"
						:key="header.key"
						class="border-b px-4 py-2 text-left text-sm font-medium"
					>
						<div class="flex items-center gap-2">
							<span>{{ header.label }}</span>
							<button
								class="text-gray-500 hover:text-gray-700"
								@click="sortTable(header.key)"
							>
								<template v-if="sortKey === header.key">
									<span v-if="sortOrder === 'asc'">▲</span>
									<span v-else>▼</span>
								</template>
								<template v-else>▲▼</template>
							</button>
						</div>
					</th>
				</tr>
			</thead>
			<tbody>
				<UsersTableRow v-for="row in filteredData" :key="row.id" :row="row" />
			</tbody>
		</table>
	</div>
</template>

<script setup lang="ts">
	const props = defineProps<{ searchQuery: string }>();
	const headers = reactive([
		{ key: 'name', label: 'Name' },
		{ key: 'age', label: 'Age' },
		{ key: 'email', label: 'Email' },
	]);

	const tableData = ref([
		{ id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
		{ id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
		{ id: 3, name: 'Charlie', age: 22, email: 'charlie@example.com' },
		{ id: 4, name: 'Alice', age: 25, email: 'alice@example.com' },
		{ id: 5, name: 'Katy', age: 28, email: 'katy@example.com' },
		{ id: 6, name: 'Bob', age: 30, email: 'bob@example.com' },
		{ id: 7, name: 'Charlie', age: 21, email: 'charlie@example.com' },
		{ id: 8, name: 'Alice', age: 25, email: 'alice@example.com' },
	]);

	const sortKey = ref<string | null>(null);
	const sortOrder = ref<'asc' | 'desc'>('asc');

	const sortTable = (key: string) => {
		if (sortKey.value === key) {
			sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
		} else {
			sortKey.value = key;
			sortOrder.value = 'asc';
		}

		tableData.value.sort((a, b) => {
			const aValue = a[key as keyof typeof a];
			const bValue = b[key as keyof typeof b];

			if (aValue < bValue) return sortOrder.value === 'asc' ? -1 : 1;
			if (aValue > bValue) return sortOrder.value === 'asc' ? 1 : -1;
			return 0;
		});
	};

	const filteredData = computed(() => {
		if (!props.searchQuery) return tableData.value;

		return tableData.value.filter((row) => {
			const value = row.name;
			return (
				value &&
				value.toString().toLowerCase().includes(props.searchQuery.toLowerCase())
			);
		});
	});
</script>
