<template>
	<NuxtLayout name="default">
		<template #default>
			<nav class="flex gap-4">
				<NuxtLink :to="`/users/${id}/profile`" :class="getTabClass('/profile')">
					Profile
				</NuxtLink>
				<NuxtLink :to="`/users/${id}/skills`" :class="getTabClass('/skills')">
					Skills
				</NuxtLink>
				<NuxtLink
					:to="`/users/${id}/languages`"
					:class="getTabClass('/languages')"
				>
					Languages
				</NuxtLink>
			</nav>

			<div class="mt-4">
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

	const tabClass = 'p-2 no-underline w-32 text-center border-b-2 border-solid';
	const activeTabClass = 'text-red-600 border-red-600';
	const inactiveTabClass = 'text-white border-transparent';

	const getTabClass = (tab) => {
		return route.path.endsWith(tab)
			? `${tabClass} ${activeTabClass} active:bg-red-500`
			: `${tabClass} ${inactiveTabClass}`;
	};
</script>
