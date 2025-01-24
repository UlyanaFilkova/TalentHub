<template>
	<div class="max-h-full w-full">
		<table class="w-full table-auto overflow-x-auto border border-gray-300">
			<thead class="sticky top-0 bg-gray-100">
				<tr>
					<th
						v-for="header in headers"
						:key="header"
						class="border-b border-gray-300 px-4 py-2 text-left text-sm font-medium"
					>
						{{ header }}
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
	const headers = ['Name', 'Age', 'Email'];

	const tableData = ref([
		{ id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
		{ id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
		{ id: 3, name: 'Charlie', age: 22, email: 'charlie@example.com' },
		{ id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
		{ id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
		{ id: 3, name: 'Charlie', age: 22, email: 'charlie@example.com' },
		{ id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
		{ id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
		{ id: 3, name: 'Charlie', age: 22, email: 'charlie@example.com' },
		{ id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
		{ id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
		{ id: 3, name: 'Charlie', age: 22, email: 'charlie@example.com' },
		{ id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
		{ id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
		{ id: 3, name: 'Charlie', age: 22, email: 'charlie@example.com' },
		{ id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
		{ id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
		{ id: 3, name: 'Charlie', age: 22, email: 'charlie@example.com' },
		{ id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
		{ id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
		{ id: 3, name: 'Charlie', age: 22, email: 'charlie@example.com' },
		{ id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
		{ id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
		{ id: 3, name: 'Charlie', age: 22, email: 'charlie@example.com' },
	]);

	const filteredData = computed(() => {
		return tableData.value.filter((row) =>
			Object.values(row).some((value) =>
				value.toString().toLowerCase().includes(props.searchQuery.toLowerCase())
			)
		);
	});

	const onSearch = () => {
		console.log('Search query updated:', props.searchQuery);
	};
</script>
