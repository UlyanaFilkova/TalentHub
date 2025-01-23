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
				<slot />
			</div>
		</template>
	</NuxtLayout>
</template>

<script setup>
	import { useRoute } from 'vue-router';

	const route = useRoute();
	const id = route.params.id;

	const isActive = (tab) => route.path.endsWith(tab);
</script>
