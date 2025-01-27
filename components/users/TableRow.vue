<template>
	<tr class="border-b">
		<td>
			<BaseUserPic
				:name="row.name"
				class="bg-profilepic-color"
				:photo="row.photo"
			/>
		</td>
		<td class="px-4 py-4 text-sm">{{ row.name }}</td>
		<td class="px-4 text-sm">{{ row.age }}</td>
		<td class="px-4 text-sm">{{ row.email }}</td>
	</tr>
</template>

<script setup lang="ts">
	defineProps<{
		row: { name: string; age: number; email: string; photo: string };
	}>();
</script>
