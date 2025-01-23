<template>
	<NuxtLink :to="item.link" :class="linkClasses">
		<div>
			<component :is="item.icon" :color="color" width="22px" />
		</div>

		<span :class="spanClasses">
			{{ item.text }}
		</span>
	</NuxtLink>
</template>

<script setup lang="ts">
	interface SidebarItem {
		text: string;
		link: string;
		isActive: boolean;
		icon: object;
	}

	const props = defineProps<{ item: SidebarItem; isCollapsed: boolean }>();

	const color = computed(() =>
		props.item.isActive
			? 'var(--color-active-text)'
			: 'var(--color-inactive-text)'
	);

	const linkClasses = computed(() => [
		'flex items-center rounded-br-[31px] rounded-tr-[31px] py-3 pr-4 gap-4 pl-4 transition duration-300 ease-in-out hover:bg-sidebar-hover',
		props.item.isActive ? 'bg-sidebar-hover text-active-color' : '',
		props.isCollapsed ? 'text-transparent' : '',
	]);

	const spanClasses = computed(() => [
		'text-sm transition-all duration-300 ease-in-out',
		props.isCollapsed
			? 'visibility-hidden opacity-0'
			: 'visibility-visible opacity-100',
		props.item.isActive ? 'text-active-color' : 'text-inactive-color',
		'truncate',
		'max-w-full',
	]);
</script>
