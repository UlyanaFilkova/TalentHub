<template>
	<NuxtLink
		:to="item.link"
		class="flex items-center space-x-3 rounded-md p-3 transition-colors duration-300 hover:bg-gray-200 hover:text-blue-600"
	>
		<div class="icon h-6 w-6">
			<component :is="item.icon" :color="color" width="22px" />
		</div>

		<span class="text-sm font-medium" :style="{ color: color }">
			{{ item.text }}
		</span>
	</NuxtLink>
</template>

<script setup lang="ts">
	interface SidebarItem {
		icon: object;
		text: string;
		link: string;
		isActive: boolean;
	}

	const props = defineProps<{ item: SidebarItem }>();
	const color = computed(() =>
		props.item.isActive
			? 'var(--color-active-text)'
			: 'var(--color-inactive-text)'
	);
</script>
