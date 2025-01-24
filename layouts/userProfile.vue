<template>
	<NuxtLayout name="default">
		<template #default>
			<nav class="flex gap-4">
				<NuxtLink
					:to="`/users/${id}/profile`"
					:class="[
						'p-2 text-white no-underline',
						isActive('/profile')
							? 'border-b-2 border-solid border-red-800 text-red-800'
							: 'text-white',
					]"
				>
					Profile
				</NuxtLink>
				<NuxtLink
					:to="`/users/${id}/skills`"
					:class="[
						'p-2 text-white no-underline',
						isActive('/skills')
							? 'border-b-2 border-solid border-red-800 text-red-800'
							: 'text-white',
					]"
				>
					Skills
				</NuxtLink>
				<NuxtLink
					:to="`/users/${id}/languages`"
					:class="[
						'p-2 text-white no-underline',
						isActive('/languages')
							? 'border-b-2 border-solid border-red-800 text-red-800'
							: 'text-white',
					]"
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

	const isActive = (tab) => route.path.endsWith(tab);

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
</script>
