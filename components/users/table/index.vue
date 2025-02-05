<template>
	<div
		ref="tableContainer"
		class="max-h-[calc(100vh-0.75rem-90px)] w-full overflow-y-auto"
		@scroll="handleScroll"
	>
		<table v-if="isDataLoaded" class="w-full table-auto overflow-x-auto">
			<UsersTableHead
				:headers="headers"
				:sort-key="sortKey"
				:sort-order="sortOrder"
				@sort="handleSort"
			/>
			<tbody>
				<UsersTableRow
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
	import { getAllUsers } from '~/utils/graphql-services/user-service';
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
	const tableContainer = ref<HTMLElement | null>(null);
	const sortKey = ref<string | null>(null);
	const sortOrder = ref<'asc' | 'desc'>('asc');
	const itemsPerPage = 10;
	const loadedCount = ref(itemsPerPage);
	const isLoading = ref(false);

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

	const displayedData = ref<
		{
			id: number;
			photo: string;
			firstName: string;
			lastName: string;
			email: string;
			department: string;
			position: string;
			link: string;
		}[]
	>([]);

	const updateDisplayedData = () => {
		displayedData.value = filteredData.value.slice(0, loadedCount.value);
	};

	const handleSort = (key: string, order: 'asc' | 'desc') => {
		sortKey.value = key;
		sortOrder.value = order;
		sortTable();
	};

	const sortTable = () => {
		if (!sortKey.value) return;

		const collator = new Intl.Collator('en', { sensitivity: 'base' });

		filteredData.value.sort((a, b) => {
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
		updateDisplayedData();
	};

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

	const handleScroll = () => {
		if (!tableContainer.value || isLoading.value) return;

		const { scrollTop, scrollHeight, clientHeight } = tableContainer.value;
		const isBottom = scrollTop + clientHeight >= scrollHeight - 50;

		if (isBottom && loadedCount.value < filteredData.value.length) {
			isLoading.value = true;

			loadedCount.value += itemsPerPage;
			isLoading.value = false;
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

	watch([filteredData, loadedCount], updateDisplayedData, { immediate: true });
</script>
