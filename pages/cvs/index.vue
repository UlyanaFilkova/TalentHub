<template>
	<div class="h-[calc(100vh-0.75rem-90px)]">
		<div class="flex items-center justify-between">
			<div>
				<BaseSearchBar
					v-model="searchQuery"
					placeholder="Search"
					class="mb-5"
				/>
			</div>
			<div>
				<BaseButton
					color="primary"
					type="button"
					variant="text"
					@click="handleAddCV"
				>
					<div class="flex items-center justify-center gap-3">
						<PlusIcon color="var(--color-red-1)" width="24" />
						CREATE CV
					</div>
				</BaseButton>
			</div>
		</div>
		<div>
			<Table
				:search-query="searchQuery"
				:headers="headers"
				:rows-data="filteredData"
				row-component="TableCvRow"
			/>
		</div>
		<BaseModal
			v-model:is-open="isAddCVModalOpen"
			confirm-text="CREATE"
			cancel-text="CANCEL"
			title="Create CV"
			:has-changes="!!name"
			@confirm="handleAddCVConfirm"
		>
			<BaseInput id="name" v-model="name" type="text" label="Name" />
			<BaseInput
				id="education"
				v-model="education"
				type="text"
				label="Education"
			/>
			<BaseTextarea
				id="description"
				v-model="description"
				label="Description"
				:rows="6"
			/>
		</BaseModal>
	</div>
</template>

<script setup lang="ts">
	import { useRouter } from '#app';
	import PlusIcon from '~/components/icons/PlusIcon.vue';
	import { createCV, getAllCvs } from '~/services/cv';
	import { showErrorToast, showSuccessToast } from '~/utils/toast/toast';

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

	interface CreateCV {
		userId: string;
		name: string;
		education: string;
		description: string;
	}

	const searchQuery = ref('');
	const isDataLoaded = ref(false);
	const cvs = ref<Cv[]>([]);
	const isAddCVModalOpen = ref(false);
	const name = ref('');
	const education = ref('');
	const description = ref('');
	const router = useRouter();

	const userId = computed(() => {
		return cvs.value.length > 0 ? String(cvs.value[0].user.id) : '';
	});

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

	const handleAddCV = () => {
		name.value = '';
		education.value = '';
		description.value = '';
		isAddCVModalOpen.value = true;
	};

	const handleAddCVConfirm = async () => {
		if (!name.value) return;
		try {
			const cv: CreateCV = {
				userId: userId.value,
				name: name.value,
				education: education.value,
				description: description.value,
			};
			const data = await createCV(cv);
			console.log(data);
			if (data) {
				isAddCVModalOpen.value = false;
				router.push(`/cvs/${data.data.createCv.id}/details`);
				showSuccessToast('CV create successfully');
			}
		} catch (error) {
			showErrorToast('CV create failed');
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
