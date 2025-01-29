<template>
	<header class="flex items-center text-inactive-color">
		<ol class="flex items-center">
			<li
				v-for="(breadcrumb, index) in breadcrumbs"
				:key="index"
				class="flex items-center"
			>
				<template v-if="index !== breadcrumbs.length - 1">
					<a
						:href="breadcrumb.link"
						class="hover:underline"
						:class="index === 1 ? 'text-accent-color' : ''"
					>
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
					<p :class="index === 1 ? 'text-accent-color' : ''">
						{{ breadcrumb.label }}
					</p>
				</template>
			</li>
		</ol>
		<p v-if="loading || error">{{ userId }}</p>
		<p v-else>{{ fullname }}</p>
	</header>
</template>

<script setup>
	import { getUserFullname } from '~/services/user/user-service';
	const route = useRoute();
	const userId = ref('1');

	const fullname = ref('');
	const isLoading = ref(true);
	const isError = ref(null);

	onMounted(() => {
		const {
			fullname: userFullname,
			loading,
			error,
		} = getUserFullname(userId.value);

		watchEffect(() => {
			isLoading.value = loading.value;
			isError.value = error.value?.name;
		});

		watch(
			userFullname,
			(newFullname) => {
				if (newFullname) {
					fullname.value = newFullname;
				} else {
					fullname.value = userId.value;
				}
			},
			{ immediate: true }
		);
	});

	const breadcrumbs = computed(() => {
		const pathSegments = route.path.split('/').filter(Boolean);

		const segments = pathSegments.map((segment, index) => {
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
