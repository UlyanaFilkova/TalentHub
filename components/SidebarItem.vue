<template>
	<NuxtLink
		:to="item.link"
		class="hover:bg-sidebar-hover flex items-center gap-4 rounded-br-[31px] rounded-tr-[31px] py-4 pl-4"
	>
		<div>
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
