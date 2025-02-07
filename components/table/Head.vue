<template>
	<thead class="sticky top-0 z-20 w-full bg-dark-1">
		<tr>
			<th
				v-for="header in headers"
				:key="header.key"
				class="border-b border-gray-5 px-3 pb-4 pt-1 text-left text-sm font-medium text-white"
			>
				<div class="flex items-center gap-2">
					<span>{{ header.label }}</span>
					<button
						v-if="header.isSortable"
						class="flex w-6 justify-center text-gray-5"
						@click="emitSort(header.key)"
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
</template>

<script setup lang="ts">
	const props = defineProps<{
		headers: { key: string; label: string; isSortable: boolean }[];
		sortKey: string | null;
		sortOrder: 'asc' | 'desc';
	}>();

	const emit = defineEmits<{
		(event: 'sort', key: string, order: 'asc' | 'desc'): void;
	}>();

	const emitSort = (key: string) => {
		const newOrder =
			props.sortKey === key && props.sortOrder === 'asc' ? 'desc' : 'asc';
		emit('sort', key, newOrder);
	};
</script>
