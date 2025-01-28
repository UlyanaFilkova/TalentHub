<template>
	<NuxtLayout name="default">
		<template #default>
			<nav class="flex">
				<NuxtLink :to="`/users/${id}/profile`" :class="getTabClass('/profile')">
					PROFILE
				</NuxtLink>
				<NuxtLink :to="`/users/${id}/skills`" :class="getTabClass('/skills')">
					SKILLS
				</NuxtLink>
				<NuxtLink
					:to="`/users/${id}/languages`"
					:class="getTabClass('/languages')"
				>
					LANGUAGES
				</NuxtLink>
			</nav>

			<div class="mt-10">
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

	const currentTab = computed(() => {
		if (route.path.endsWith('/profile')) {
			return Profile;
		}
		if (route.path.endsWith('/languages')) {
			return Languages;
		}
		if (route.path.endsWith('/skills')) {
			return Skills;
		}
		return null;
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
