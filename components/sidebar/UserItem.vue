<template>
	<NuxtLink :to="item.link" :class="linkClasses">
		<div
			class="relative flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent-color"
		>
			<img
				v-if="item.photo"
				:src="item.photo"
				alt="photo"
				class="block h-full w-full flex-shrink-0 object-cover"
			/>
			<div
				v-else
				:color="color"
				class="flex h-full w-full items-center justify-center text-xl font-medium text-background"
			>
				{{ item.text[0].toUpperCase() }}
			</div>
		</div>
		<span :class="spanClasses">
			{{ item.text }}
		</span>
	</NuxtLink>
</template>

<script setup lang="ts">
	interface SidebarUserItem {
		text: string;
		link: string;
		photo?: string;
	}

	const props = defineProps<{ item: SidebarUserItem; isCollapsed: boolean }>();

	const color = 'var(--color-inactive-text)';

	const linkClasses = computed(() => [
		'flex items-center rounded-br-[31px] rounded-tr-[31px] py-2 pr-4 gap-2 pl-2 transition duration-300 ease-in-out hover:bg-sidebar-hover',
		props.isCollapsed ? 'text-transparent' : '',
	]);

	const spanClasses = computed(() => [
		'text-sm transition-all duration-300 ease-in-out text-inactive-color',
		props.isCollapsed
			? 'visibility-hidden opacity-0'
			: 'visibility-visible opacity-100',
		'truncate',
		'max-w-full',
	]);
</script>
