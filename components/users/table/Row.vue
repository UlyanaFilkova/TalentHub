<template>
	<tr class="border-b border-low-contrast-color text-sm text-active-color">
		<td class="px-2 py-4">
			<BaseUserPic
				:name="`${row.firstName} ${row.lastName}`"
				class="bg-profilepic-color"
				:photo="row.photo"
			/>
		</td>
		<td
			v-for="(value, key) in displayedFields"
			:key="key"
			class="px-4 py-4 font-medium"
		>
			{{ value }}
		</td>
		<td class="px-4 py-4">
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

	const displayedFields = computed(() => {
		return {
			firstName: props.row.firstName,
			lastName: props.row.lastName,
			email: props.row.email,
			department: props.row.department,
			position: props.row.position,
		};
	});

	const currentUserId = 1;

	const optionsVisible = ref(false);
	const optionsContainer = ref<HTMLElement | null>(null);
	const optionsPosition = ref('top-0');

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
		console.log('Profile clicked');
	};

	const updateUser = () => {
		console.log('Update user clicked');
	};

	const deleteUser = () => {
		console.log('Delete user clicked');
	};
</script>
