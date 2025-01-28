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
			color="var(--color-active-text)"
			@click="toggleSidebar"
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
			icon: markRaw(IconsEmployees),
			text: 'Employees',
			link: '/users',
			isActive: true,
		},
		{
			icon: markRaw(IconsSkills),
			text: 'Skills',
			link: '/skills',
			isActive: false,
		},
		{
			icon: markRaw(IconsLanguages),
			text: 'Languages',
			link: '/languages',
			isActive: false,
		},
		{
			icon: markRaw(IconsCVs),
			text: 'CVs',
			link: '/cvs',
			isActive: false,
		},
	]);

	const user = reactive({
		photo: '',

		text: 'username@usernameemail.com',
		link: '#',
	});

	const isCollapsed = ref(false);

	const toggleSidebar = () => {
		isCollapsed.value = !isCollapsed.value;
	};
	const logout = () => {
		console.log('logout clicked');
	};

	const route = useRoute();

	const updateActiveTab = () => {
		items.forEach((item) => {
			item.isActive = route.path.startsWith(item.link);
		});
	};

	watch(
		() => route.path,
		() => {
			updateActiveTab();
		},
		{ immediate: true }
	);
</script>
