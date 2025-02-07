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
		props.item.isActive ? 'var(--color-white)' : 'var(--color-gray-1)'
	);

	const linkClasses = computed(() => [
		'flex items-center rounded-br-[31px] rounded-tr-[31px] py-3 pr-4 gap-4 pl-4 transition duration-300 ease-in-out hover:bg-dark-4',
		props.item.isActive ? 'bg-dark-4 text-white' : '',
		props.isCollapsed ? 'text-transparent' : '',
	]);

	const spanClasses = computed(() => [
		'text-sm transition-all duration-300 ease-in-out',
		props.isCollapsed
			? 'visibility-hidden opacity-0'
			: 'visibility-visible opacity-100',
		props.item.isActive ? 'text-white' : 'text-gray-1',
		'truncate',
		'max-w-full',
	]);
</script>
