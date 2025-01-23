<template>
	<aside
		:class="[
			'flex flex-col gap-3 transition-all duration-300',
			isCollapsed ? 'w-14' : 'w-48',
		]"
	>
		<nav class="flex flex-col gap-3">
			<SidebarItem
				v-for="item in items"
				:key="item.text"
				:item="item"
				:is-collapsed="isCollapsed"
			/>
		</nav>
		<SidebarItem :item="user" :is-collapsed="isCollapsed" class="mt-auto" />
		<SidebarToggleButton
			:is-toggled="isCollapsed"
			class="mb-4 ml-2"
			@toggle="toggleSidebar"
		/>
	</aside>
</template>

<script setup lang="ts">
	import IconsCVs from '~/components/icons/CVs.vue';
	import IconsEmployees from '~/components/icons/Employees.vue';
	import IconsLanguages from '~/components/icons/Languages.vue';
	import IconsSkills from '~/components/icons/Skills.vue';
	const items = [
		{
			icon: IconsEmployees,
			text: 'Employees',
			link: '#',
			isActive: true,
		},
		{
			icon: IconsSkills,
			text: 'Skills',
			link: '#',
			isActive: false,
		},
		{
			icon: IconsLanguages,
			text: 'Languages',
			link: '#',
			isActive: false,
		},
		{
			icon: IconsCVs,
			text: 'CVs',
			link: '#',
			isActive: false,
		},
	];

	const user = {
		photo: '...',
		text: 'username@usernameemail.com',
		link: '/profile',
		isActive: false,
	};
	const isCollapsed = ref(false);

	const toggleSidebar = () => {
		isCollapsed.value = !isCollapsed.value;
	};
</script>
