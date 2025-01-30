<template>
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
</template>

<script setup lang="ts">
	defineProps<{
		headers: { key: string; label: string; isSortable: boolean }[];
		sortKey: string | null;
		sortOrder: 'asc' | 'desc';
		sortTable: (key: string) => void;
	}>();
</script>
