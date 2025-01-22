<template>
	<NuxtLink
		:to="item.link"
		:class="[
			'flex items-center gap-4 rounded-br-[31px] rounded-tr-[31px] py-3 pl-4 transition duration-200 ease-in-out hover:bg-sidebar-hover',
			item.isActive ? 'bg-sidebar-hover text-active-color' : '',
		]"
	>
		<div>
			<component :is="item.icon" :color="color" width="22px" />
		</div>

		<span
			class="text-sm"
			:class="item.isActive ? 'text-active-color' : 'text-inactive-color'"
		>
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
