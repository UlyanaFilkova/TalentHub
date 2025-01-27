<template>
	<button :class="linkClasses" @click="onClick">
		<div
			class="relative flex h-8 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full"
		>
			<IconsLogout color="var(--color-active-text)" width="20px" />
		</div>
		<span :class="spanClasses">Logout</span>
	</button>
</template>

<script setup lang="ts">
	const props = defineProps<{ isCollapsed: boolean }>();

	const emit = defineEmits<{
		(event: 'click'): void;
	}>();

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

	const onClick = () => {
		emit('click');
	};
</script>
