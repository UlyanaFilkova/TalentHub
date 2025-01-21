<template>
	<aside>
		<nav>
			<SidebarItem v-for="item in items" :key="item.text" :item="item" />
		</nav>
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
			link: '/employees',
			isActive: true,
		},
		{
			icon: IconsSkills,
			text: 'Skills',
			link: '/skills',
			isActive: false,
		},
		{
			icon: IconsLanguages,
			text: 'Languages',
			link: '/languages',
			isActive: false,
		},
		{
			icon: IconsCVs,
			text: 'CVs',
			link: '/cvs',
			isActive: false,
		},
	];
</script>
