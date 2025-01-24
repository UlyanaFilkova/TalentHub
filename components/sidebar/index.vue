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
		<SidebarUserItem :item="user" :is-collapsed="isCollapsed" class="mt-auto" />
		<SidebarLogoutItem :is-collapsed="isCollapsed" @click="logout" />
		<ButtonsToggle
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

	const items = reactive([
		{
			icon: IconsEmployees,
			text: 'Employees',
			link: '/users',
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
	]);

	const user = reactive({
		photo: '',
		text: 'username@usernameemail.com',
		link: '/profile',
	});

	const isCollapsed = ref(false);

	const toggleSidebar = () => {
		isCollapsed.value = !isCollapsed.value;
	};
	const logout = () => {
		console.log('logout clicked');
	};
</script>
