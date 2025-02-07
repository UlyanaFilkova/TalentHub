<template>
	<div class="mt-2 flex w-full justify-center">
		<button
			class="focus:bg-gray-9 min-w-[150px] border-b-2 px-6 py-3 font-medium transition-all duration-200 ease-in-out"
			:class="{
				'border-red-5 text-red-5': currentRoute === '/auth/login',
				'border-transparent text-white': currentRoute !== '/auth/login',
				'active:translate-x-2 active:scale-95': currentRoute === '/auth/login',
			}"
			@click="navigate('/auth/login')"
		>
			LOG IN
		</button>
		<button
			class="focus:bg-gray-9 min-w-[150px] border-b-2 px-6 py-3 font-medium transition-all duration-200 ease-in-out"
			:class="{
				'border-red-5 text-red-5': currentRoute === '/auth/signup',
				'border-transparent text-white': currentRoute !== '/auth/signup',
				'active:translate-x-2 active:scale-95': currentRoute === '/auth/signup',
			}"
			@click="navigate('/auth/signup')"
		>
			SIGN UP
		</button>
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import { useRoute, useRouter } from 'vue-router';

	const router = useRouter();
	const route = useRoute();

	const currentRoute = computed(() => route.path);

	const navigate = (path: string) => {
		if (currentRoute.value !== path) {
			router.push(path);
		}
	};
</script>
