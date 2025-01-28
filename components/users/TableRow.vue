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
			<NuxtLink :to="`/users/${row.id}/profile`">
				<ButtonsToggle is-toggled color="var(--color-inactive-text)" />
			</NuxtLink>
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
</script>
