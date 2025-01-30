<template>
	<header class="flex items-center text-inactive-color">
		<ol class="flex items-center">
			<HeaderItem
				v-for="(breadcrumb, index) in breadcrumbs"
				:key="index"
				:breadcrumb="breadcrumb"
				:index="index"
				:isLast="index === breadcrumbs.length - 1"
			/>
		</ol>
	</header>
</template>

<script setup lang="ts">
	import { getCvFullname } from '~/services/cv/cv-service';
	import { getUserFullname } from '~/services/user/user-service';
	const route = useRoute();

	const id = ref('');
	const fullname = ref('');

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

		if (
			fullname.value &&
			(pathSegments[0] === 'users' || pathSegments[0] === 'cvs') &&
			pathSegments[1]
		) {
			segments[1].label = fullname.value;
		}

		return segments;
	});

	const updateValues = () => {
		const pathSegments: string[] = route.path.split('/').filter(Boolean);

		if (
			(pathSegments[0] === 'users' || pathSegments[0] === 'cvs') &&
			pathSegments[1]
		) {
			id.value = pathSegments[1];
		} else {
			return;
		}

		const elemFullname = ref<string>('');
		const elemEmail = ref<string>('');

		switch (pathSegments[0]) {
			case 'users': {
				const { fullname: userFullname, email: userEmail } = getUserFullname(
					id.value
				);
				elemFullname.value = userFullname.value;
				elemEmail.value = userEmail.value;
				break;
			}
			case 'cvs': {
				elemFullname.value = getCvFullname(id.value).fullname.value;
				break;
			}
			default: {
				return;
			}
		}

		if (elemFullname.value && elemFullname.value !== '') {
			fullname.value = elemFullname.value;
		} else if (pathSegments[0] === 'users' && elemEmail.value) {
			fullname.value = elemEmail.value;
		} else {
			fullname.value = id.value;
		}
	};

	watchEffect(() => {
		if (import.meta.client) {
			updateValues();
		}
	});

	onMounted(() => {
		updateValues();
	});
</script>
