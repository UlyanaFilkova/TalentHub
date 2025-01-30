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
				<CvTableRow v-for="cv in filteredData" :key="cv.id" :cv="cv" />
			</tbody>
		</table>
	</div>
</template>

<script setup lang="ts">
	import { getUserWithCVs } from '~/services/cv/cv-service';
	interface CV {
		id: string | number;
		name: string;
		education: string;
		description: string;
		user: { id: string; email: string };
	}

	const props = defineProps<{ searchQuery: string }>();

	const headers = reactive([
		{ key: 'name', label: 'Name', isSortable: true },
		{ key: 'education', label: 'Education', isSortable: true },
		{ key: 'user', label: 'User', isSortable: true },
		{ key: 'link', label: 'Link', isSortable: false },
	]);

	const cvs = ref<CV[]>([]);
	const isDataLoaded = ref(false);

	const tableData = computed(() => {
		if (!isDataLoaded.value) return [];
		return cvs.value.map((cv) => ({
			id: cv.id,
			name: cv.name,
			education: cv.education || 'N/A',
			user: cv.user.email,
			link: `/cvs/${cv.id}/details`,
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

			return sortOrder.value === 'asc'
				? collator.compare(aStr, bStr)
				: collator.compare(bStr, aStr);
		});
	};

	const filteredData = computed(() => {
		if (!props.searchQuery || !tableData.value) return tableData.value;

		const lowerCaseSearch = props.searchQuery.toLowerCase();

		return tableData.value.filter((row) => {
			const nameMatches = row.name?.toLowerCase().includes(lowerCaseSearch);
			const emailMatches = row.user?.toLowerCase().includes(lowerCaseSearch);
			return nameMatches || emailMatches;
		});
	});

	// const getCVs = () => {
	// 	try {
	// 		const { cvs: cvData } = getAllCVs();
	// 		cvs.value = cvData.value;
	// 		isDataLoaded.value = true;
	// 	} catch (error) {
	// 		console.error('Error loading CVs:', error);
	// 		isDataLoaded.value = true;
	// 	}
	// };

	const userId = '469';

	const getCVs = () => {
		try {
			const { userWithCVs: userCVs } = getUserWithCVs(userId);
			if (userCVs.value && userCVs.value.cvs) {
				userCVs.value.forEach((cv: CV) => {
					cvs.value.push({
						id: cv.id,
						name: cv.name,
						education: cv.education || 'N/A',
						description: cv.description,
						user: cv.user,
					});
				});

				isDataLoaded.value = true;
			}
		} catch (error) {
			console.error('Error loading users or CVs:', error);
			isDataLoaded.value = true;
		}
	};

	onMounted(() => {
		getCVs();
	});

	watchEffect(() => {
		if (import.meta.client) {
			getCVs();
		}
	});
</script>
