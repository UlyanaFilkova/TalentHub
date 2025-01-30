<template>
	<div class="h-[calc(100vh-0.75rem-90px)]">
		<div class="">
			<BaseSearchBar v-model="searchQuery" placeholder="Search" class="mb-5" />
		</div>
		<div class="max-h-full overflow-y-auto">
			<CvsTable :search-query="searchQuery" />
		</div>
	</div>
</template>

<script setup lang="ts">
	const searchQuery = ref('');
</script>
