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
	import { getAllUsers } from '~/services/user/user-service';
	interface User {
		id: string | number;
		profile: {
			avatar: string | null;
			first_name: string;
			last_name: string;
		};
		email: string;
		department: { name: string } | null;
		position: { name: string } | null;
	}

	const props = defineProps<{ searchQuery: string }>();

	const headers = reactive([
		{ key: 'avatar', label: '', isSortable: false },
		{ key: 'firstName', label: 'First Name', isSortable: true },
		{ key: 'lastName', label: 'Last Name', isSortable: true },
		{ key: 'email', label: 'Email', isSortable: true },
		{ key: 'department', label: 'Department', isSortable: true },
		{ key: 'position', label: 'Position', isSortable: true },
		{ key: 'link', label: '', isSortable: false },
	]);

	const users = ref<User[]>([]);
	const isDataLoaded = ref(false);

	const tableData = computed(() => {
		if (!isDataLoaded.value) return [];
		return users.value.map((user) => ({
			id: Number(user.id),
			photo: user.profile.avatar || '',
			firstName: user.profile.first_name,
			lastName: user.profile.last_name,
			email: user.email,
			department: user.department?.name || 'N/A',
			position: user.position?.name || 'N/A',
			link: `/users/${user.id}/profile`,
		}));
	});

	const sortKey = ref<string | null>(null);
	const sortOrder = ref<'asc' | 'desc'>('asc');

	const sortTable = (key: string) => {
		if (sortKey.value === key) {
			sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
		} else {
			sortKey.value = key;
			sortOrder.value = 'asc';
		}

		const collator = new Intl.Collator('en', { sensitivity: 'base' });

		filteredData.value.sort((a, b) => {
			const aValue = a[key as keyof typeof a];
			const bValue = b[key as keyof typeof b];

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
	};

	const filteredData = computed(() => {
		if (!props.searchQuery || !tableData.value) return tableData.value;

		const lowerCaseSearch = props.searchQuery.toLowerCase();

		return tableData.value.filter((row) => {
			const firstNameMatches = row.firstName
				?.toLowerCase()
				.includes(lowerCaseSearch);
			const lastNameMatches = row.lastName
				?.toLowerCase()
				.includes(lowerCaseSearch);
			const emailMatches = row.email?.toLowerCase().includes(lowerCaseSearch);
			return firstNameMatches || lastNameMatches || emailMatches;
		});
	});

	const getUsers = () => {
		try {
			const { users: usersData } = getAllUsers();

			users.value = usersData.value;
			isDataLoaded.value = true;
		} catch (error) {
			console.error('Error loading users:', error);
			isDataLoaded.value = true;
		}
	};

	onMounted(() => {
		getUsers();
	});

	watchEffect(() => {
		if (import.meta.client) {
			getUsers();
		}
	});
</script>
