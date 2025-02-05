<template>
	<tr
		class="w-full border-b border-low-contrast-color text-sm text-active-color"
	>
		<td class="py-4 pr-4">
			<BaseUserPic
				:name="`${row.firstName} ${row.lastName}`"
				class="bg-profilepic-color"
				:photo="row.photo"
			/>
		</td>
		<td
			v-for="(item, key) in displayedFields"
			:key="key"
			:class="[
				'custom-column py-4 pr-3 font-medium',
				displayedFields[key].class,
			]"
		>
			{{ item.value }}
		</td>
		<td class="py-4 pr-2">
			<template v-if="row.id === currentUserId">
				<div
					ref="optionsContainer"
					class="relative"
					@mouseenter="showOptions"
					@mouseleave="hideOptions"
				>
					<ButtonsOptions is-toggled color="var(--color-active-text)" />

					<UsersTableOptions
						v-if="optionsVisible"
						class="absolute right-0 z-10 mt-2 w-28 rounded-lg border-options-backgroud bg-options-backgroud py-2 shadow-lg"
						:class="optionsPosition"
						@profile-click="openProfile"
						@update-click="updateUser"
						@delete-click="deleteUser"
					/>
				</div>
			</template>
			<template v-else>
				<NuxtLink :to="`/users/${row.id}/profile`">
					<ButtonsToggle is-toggled color="var(--color-inactive-text)" />
				</NuxtLink>
			</template>
		</td>
	</tr>
</template>

<script setup lang="ts">
	const router = useRouter();
	const props = defineProps<{
		row: {
			id: number;
			photo: string;
			firstName: string;
			lastName: string;
			email: string;
			department: string;
			position: string;
			link: string;
		};
		tableContainer: HTMLElement | null;
	}>();

	const currentUserId = 1;

	const optionsVisible = ref(false);
	const optionsContainer = ref<HTMLElement | null>(null);
	const optionsPosition = ref('top-0');

	const displayedFields = computed(() => {
		return {
			firstName: { value: props.row.firstName, class: 'small-column' },
			lastName: { value: props.row.lastName, class: 'medium-column' },
			email: { value: props.row.email, class: 'big-column' },
			department: { value: props.row.department, class: 'small-column' },
			position: { value: props.row.position, class: 'medium-column' },
		};
	});

	const showOptions = async () => {
		optionsVisible.value = true;
		await nextTick();
		if (optionsContainer.value && props.tableContainer) {
			const rect = optionsContainer.value.getBoundingClientRect();
			const tableRect = props.tableContainer.getBoundingClientRect();
			const spaceBelow = tableRect.bottom - rect.bottom;

			optionsPosition.value = spaceBelow < 150 ? 'bottom-0' : 'top-0';
		}
	};

	const hideOptions = () => {
		optionsVisible.value = false;
	};

	const openProfile = () => {
		router.push(`/users/${props.row.id}/profile`);
	};

	const updateUser = () => {};

	const deleteUser = () => {};
</script>

<style scoped>
	.small-column {
		min-width: 160px;
		max-width: 200px;
	}
	.medium-column {
		min-width: 170px;
		max-width: 200px;
	}
	.big-column {
		min-width: 255px;
		max-width: 260px;
	}

	.custom-column {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
