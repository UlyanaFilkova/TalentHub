<template>
	<div class="h-[calc(100vh-0.75rem-90px)]">
		<div>
			<BaseSearchBar v-model="searchQuery" placeholder="Search" class="mb-5" />
		</div>
		<div>
			<Table
				:search-query="searchQuery"
				:headers="headers"
				:rows-data="filteredData"
			/>
		</div>
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

	const searchQuery = ref('');
	const isDataLoaded = ref(false);
	const users = ref<User[]>([]);

	const headers = reactive([
		{ key: 'avatar', label: '', isSortable: false },
		{ key: 'firstName', label: 'First Name', isSortable: true },
		{ key: 'lastName', label: 'Last Name', isSortable: true },
		{ key: 'email', label: 'Email', isSortable: true },
		{ key: 'department', label: 'Department', isSortable: true },
		{ key: 'position', label: 'Position', isSortable: true },
		{ key: 'link', label: '', isSortable: false },
	]);

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
		if (!searchQuery.value || !tableData.value) return tableData.value;

		const lowerCaseSearch = searchQuery.value.toLowerCase();

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
