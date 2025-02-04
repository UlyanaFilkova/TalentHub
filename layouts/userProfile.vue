<template>
	<NuxtLayout name="default">
		<template #default>
			<nav class="flex">
				<NuxtLink
					v-for="tab in tabs"
					:key="tab.path"
					:to="`/users/${id}${tab.path}`"
					:class="getTabClass(tab.path)"
				>
					{{ tab.label }}
				</NuxtLink>
			</nav>

			<div class="mt-8">
				<KeepAlive>
					<component :is="currentTab"></component>
				</KeepAlive>
			</div>
		</template>
	</NuxtLayout>
</template>

<script setup>
	import { useRoute } from 'vue-router';
	import Languages from '~/pages/users/[id]/languages.vue';
	import Profile from '~/pages/users/[id]/profile.vue';
	import Skills from '~/pages/users/[id]/skills.vue';

	const route = useRoute();
	const id = route.params.id;

	const tabs = [
		{ path: '/profile', label: 'PROFILE' },
		{ path: '/skills', label: 'SKILLS' },
		{ path: '/languages', label: 'LANGUAGES' },
	];

	const currentTab = computed(() => {
		const path = route.path;
		switch (true) {
			case path.endsWith('/profile'):
				return Profile;
			case path.endsWith('/languages'):
				return Languages;
			case path.endsWith('/skills'):
				return Skills;
			default:
				return null;
		}
	});

	const tabClass =
		'p-2 text-sm no-underline w-36 h-11 text-center border-b-2 border-solid transition-all duration-200  active:bg-red-500/10';
	const activeTabClass = 'text-red-600 border-red-600 ';
	const inactiveTabClass = 'text-white border-transparent';

	const getTabClass = (tab) => {
		return route.path.endsWith(tab)
			? `${tabClass} ${activeTabClass} `
			: `${tabClass} ${inactiveTabClass}`;
	};
</script>
