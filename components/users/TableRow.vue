<template>
	<tr class="border-b border-low-contrast-color text-sm text-active-color">
		<td class="px-2 py-4">
			<BaseUserPic
				:name="`${row.firstName} ${row.lastName}`"
				class="bg-profilepic-color"
				:photo="row.photo"
			/>
		</td>
		<td class="px-3 py-4 font-medium">
			{{ row.firstName }}
		</td>
		<td class="px-4 py-4 font-medium">
			{{ row.lastName }}
		</td>
		<td class="px-4 py-4">
			{{ row.email }}
		</td>
		<td class="px-4 py-4">
			{{ row.department }}
		</td>
		<td class="px-4 py-4">
			{{ row.position }}
		</td>
		<td class="px-4 py-4">
			<template v-if="row.id === userId">
				<div
					class="relative"
					@mouseenter="showOptions"
					@mouseleave="hideOptions"
				>
					<ButtonsOptions is-toggled color="var(--color-active-text)" />

					<UsersOptions
						v-if="optionsVisible"
						class="bg-options-backgroud border-options-backgroud absolute right-0 top-4 z-10 mt-2 w-28 rounded-lg py-2 shadow-lg"
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
	defineProps<{
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
	}>();

	const userId = 1;

	const optionsVisible = ref(false);

	const showOptions = () => {
		optionsVisible.value = true;
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
