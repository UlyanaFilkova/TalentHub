<template>
	<NuxtLayout name="default">
		<template #default>
			<nav class="flex">
				<NuxtLink
					v-for="tab in tabs"
					:key="tab.path"
					:to="`/cvs/${id}${tab.path}`"
					:class="getTabClass(tab.path)"
				>
					{{ tab.label }}
				</NuxtLink>
			</nav>

			<div class="mt-8">
				<KeepAlive>
					<NuxtPage></NuxtPage>
				</KeepAlive>
			</div>
		</template>
	</NuxtLayout>
</template>

<script setup>
	import { useRoute } from 'vue-router';

	const route = useRoute();
	const id = route.params.id;

	const tabs = [
		{ path: '/details', label: 'DETAILS' },
		{ path: '/skills', label: 'SKILLS' },
		{ path: '/projects', label: 'PROJECTS' },
		{ path: '/preview', label: 'PREVIEW' },
	];

	const currentTab = computed(() => {
		const path = route.path;
		switch (true) {
			case path.endsWith('/details'):
				return DETAILS;
			case path.endsWith('/skills'):
				return SKILLS;
			case path.endsWith('/projects'):
				return PROJECTS;
			case path.endsWith('/preview'):
				return PREVIEW;
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
