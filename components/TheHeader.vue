<template>
	<header class="flex items-center text-inactive-color">
		<ol class="flex items-center">
			<li
				v-for="(breadcrumb, index) in breadcrumbs"
				:key="index"
				class="flex items-center"
			>
				<template v-if="index !== breadcrumbs.length - 1">
					<a :href="breadcrumb.link" class="hover:underline">
						<p>{{ breadcrumb.label }}</p>
					</a>
					<span aria-hidden="true" class="mx-2">
						<IconsBackArrow
							is-toggled="true"
							color="var(--color-second-text)"
							width="14px"
						/>
					</span>
				</template>

				<template v-else>
					<p class="flex cursor-default items-center">
						{{ breadcrumb.label }}
					</p>
				</template>
			</li>
		</ol>
	</header>
</template>

<script setup>
	import { computed } from 'vue';
	import { useRoute } from 'vue-router';

	const route = useRoute();

	const breadcrumbs = computed(() => {
		const pathSegments = route.path.split('/').filter(Boolean);

		const segments = pathSegments.map((segment, index) => {
			const isLast = index === pathSegments.length - 1;

			return {
				label:
					segment === 'users'
						? 'Employees'
						: segment.charAt(0).toUpperCase() + segment.slice(1),
				link: '/' + pathSegments.slice(0, index + 1).join('/'),
			};
		});

		return segments;
	});
</script>
