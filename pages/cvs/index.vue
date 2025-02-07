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
				row-component="TableCvRow"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { getAllCvs } from '~/utils/graphql-services/cv-service';

	interface Cv {
		id: string | number;
		name: string;
		education: string;
		description: string;
		user: {
			id: string | number;
			email: string;
		};
	}

	const searchQuery = ref('');
	const isDataLoaded = ref(false);
	const cvs = ref<Cv[]>([]);

	const headers = reactive([
		{ key: 'name', label: 'CV Name', isSortable: true },
		{ key: 'education', label: 'Education', isSortable: true },
		{ key: 'email', label: 'Email', isSortable: true },
		{ key: 'link', label: '', isSortable: false },
	]);

	const tableData = computed(() => {
		if (!isDataLoaded.value) return [];
		return cvs.value.map((cv) => ({
			id: Number(cv.id),
			name: cv.name,
			education: cv.education || '',
			description: cv.description || '',
			email: cv.user.email,
			link: `/cvs/${cv.id}/details`,
		}));
	});

	const filteredData = computed(() => {
		if (!searchQuery.value || !tableData.value) return tableData.value;

		const lowerCaseSearch = searchQuery.value.toLowerCase();

		return tableData.value.filter((row) => {
			const nameMatches = row.name?.toLowerCase().includes(lowerCaseSearch);
			const emailMatches = row.email?.toLowerCase().includes(lowerCaseSearch);
			return nameMatches || emailMatches;
		});
	});

	const getCvs = async () => {
		try {
			const { cvs: data } = await getAllCvs();

			cvs.value = data?.cvs ?? [];
		} catch (error) {
			console.error('Error loading CVs:', error);
		} finally {
			isDataLoaded.value = true;
		}
	};

	onMounted(() => {
		getCvs();
	});

	watchEffect(() => {
		if (import.meta.client) {
			getCvs();
		}
	});
</script>
