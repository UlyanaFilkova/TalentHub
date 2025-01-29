<template>
	<div class="max-h-full w-full">
		<table class="w-full table-auto overflow-x-auto">
			<thead class="sticky top-0 z-20 bg-background">
				<tr>
					<th
						v-for="header in headers"
						:key="header.key"
						class="border-b border-low-contrast-color px-4 pb-4 pt-1 text-left text-sm font-medium text-active-color"
					>
						<div class="flex items-center gap-2">
							<span>{{ header.label }}</span>
							<button
								v-if="header.isSortable"
								class="flex w-6 justify-center text-low-contrast-color"
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
		{ key: 'photo', label: '', isSortable: false },
		{ key: 'firstName', label: 'First Name', isSortable: true },
		{ key: 'lastName', label: 'Last Name', isSortable: true },
		{ key: 'email', label: 'Email', isSortable: true },
		{ key: 'department', label: 'Department', isSortable: true },
		{ key: 'position', label: 'Position', isSortable: true },
		{ key: 'link', label: '', isSortable: false },
	]);

	const tableData = ref([
		{
			id: 1,
			photo: '',
			firstName: 'Alice',
			lastName: 'Smith',
			email: 'alice@example.com',
			department: 'Engineering',
			position: 'Software Engineer',
			link: `users/1/profile`,
		},
		{
			id: 2,
			photo: '',
			firstName: 'Bob',
			lastName: 'Johnson',
			email: 'bob@example.com',
			department: 'Marketing',
			position: 'Marketing Specialist',
			link: 'users/2/profile',
		},
		{
			id: 3,
			photo: '',
			firstName: 'Charlie',
			lastName: 'Brown',
			email: 'charlie@example.com',
			department: 'Sales',
			position: 'Sales Manager',
			link: 'users/3/profile',
		},
		{
			id: 4,
			photo: '',
			firstName: 'Katy',
			lastName: 'Smith',
			email: 'alice@example.com',
			department: 'Engineering',
			position: 'Software Engineer',
			link: `users/4/profile`,
		},
		{
			id: 5,
			photo: '',
			firstName: 'Bob',
			lastName: 'Johnson',
			email: 'bob@example.com',
			department: 'Marketing',
			position: 'Marketing Specialist',
			link: 'users/5/profile',
		},
		{
			id: 6,
			photo: '',
			firstName: 'John',
			lastName: 'Smith',
			email: 'john@example.com',
			department: 'Sales',
			position: 'Sales Manager',
			link: 'users/6/profile',
		},
		{
			id: 7,
			photo: '',
			firstName: 'Katy',
			lastName: 'Smith',
			email: 'alice@example.com',
			department: 'Engineering',
			position: 'Software Engineer',
			link: `users/4/profile`,
		},
		{
			id: 8,
			photo: '',
			firstName: 'Bob',
			lastName: 'Johnson',
			email: 'bob@example.com',
			department: 'Marketing',
			position: 'Marketing Specialist',
			link: 'users/5/profile',
		},
		{
			id: 9,
			photo: '',
			firstName: 'John',
			lastName: 'Smith',
			email: 'john@example.com',
			department: 'Sales',
			position: 'Sales Manager',
			link: 'users/6/profile',
		},
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

		const lowerCaseSearch = props.searchQuery.toLowerCase();

		return tableData.value.filter((row) => {
			const firstNameMatches = row.firstName
				.toLowerCase()
				.includes(lowerCaseSearch);
			const lastNameMatches = row.lastName
				.toLowerCase()
				.includes(lowerCaseSearch);
			const emailMatches = row.email.toLowerCase().includes(lowerCaseSearch);
			return firstNameMatches || lastNameMatches || emailMatches;
		});
	});
</script>
