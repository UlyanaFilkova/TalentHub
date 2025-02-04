<template>
	<NuxtLink :to="item.link" :class="linkClasses">
		<BaseUserPic
			:name="item.text"
			:photo="item.photo"
			class="bg-red-1 font-medium"
		/>

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

	const linkClasses = computed(() => [
		'flex items-center rounded-br-[31px] rounded-tr-[31px] py-2 pr-4 gap-2 pl-2 transition duration-300 ease-in-out hover:bg-dark-4',
		props.isCollapsed ? 'text-transparent' : '',
	]);

	const spanClasses = computed(() => [
		'text-sm transition-all duration-300 ease-in-out text-gray-1',
		props.isCollapsed
			? 'visibility-hidden opacity-0'
			: 'visibility-visible opacity-100',
		'truncate',
		'max-w-full',
	]);
</script>
