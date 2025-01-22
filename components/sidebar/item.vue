<template>
	<NuxtLink
		:to="item.link"
		:class="[
			'flex items-center rounded-br-[31px] rounded-tr-[31px] py-3 pr-4 transition duration-300 ease-in-out hover:bg-sidebar-hover',
			item.isActive ? 'bg-sidebar-hover text-active-color' : '',
			isCollapsed ? 'text-transparent' : '',
			item.photo ? 'gap-2 pl-2' : 'gap-4 pl-4',
		]"
	>
		<div>
			<template v-if="item.photo">
				<img
					:src="item.photo"
					alt="photo"
					class="h-10 w-10 rounded-full bg-white object-cover"
				/>
			</template>

			<template v-else>
				<component :is="item.icon" :color="color" width="22px" />
			</template>
		</div>

		<span
			:class="[
				'text-sm transition-all duration-300 ease-in-out',
				isCollapsed
					? 'visibility-hidden opacity-0'
					: 'visibility-visible opacity-100',
				item.isActive ? 'text-active-color' : 'text-inactive-color',
				'truncate',
				'max-w-full',
			]"
		>
			{{ item.text }}
		</span>
	</NuxtLink>
</template>

<script setup lang="ts">
	interface SidebarItem {
		text: string;
		link: string;
		isActive: boolean;
		icon?: object;
		photo?: string;
	}

	const props = defineProps<{ item: SidebarItem; isCollapsed: boolean }>();
	const color = computed(() =>
		props.item.isActive
			? 'var(--color-active-text)'
			: 'var(--color-inactive-text)'
	);
</script>
