<template>
	<tr class="border-b border-low-contrast-color text-sm text-active-color">
		<td class="px-2">
			<BaseUserPic
				:name="`${row.firstName} ${row.lastName}`"
				class="bg-profilepic-color"
				:photo="row.photo"
			/>
		</td>
		<td class="px-3 py-2 font-medium">
			{{ row.firstName }}
		</td>
		<td class="px-4 py-2 font-medium">
			{{ row.lastName }}
		</td>
		<td class="px-4 py-2">
			{{ row.email }}
		</td>
		<td class="px-4 py-2">
			{{ row.department }}
		</td>
		<td class="px-4 py-2">
			{{ row.position }}
		</td>
		<td class="px-4 py-2">
			<NuxtLink :to="`/users/${row.id}/profile`">
				<ButtonsToggle
					is-toggled
					class="mb-4 ml-2"
					color="var(--color-inactive-text)"
				/>
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
