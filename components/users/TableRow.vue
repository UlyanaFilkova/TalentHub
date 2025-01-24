<template>
	<tr>
		<td class="border-b border-gray-300 px-4 py-2 text-sm">{{ row.name }}</td>
		<td class="border-b border-gray-300 px-4 py-2 text-sm">{{ row.age }}</td>
		<td class="border-b border-gray-300 px-4 py-2 text-sm">{{ row.email }}</td>
	</tr>
</template>

<script setup lang="ts">
	defineProps<{ row: { name: string; age: number; email: string } }>();
</script>
