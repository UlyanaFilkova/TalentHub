<template>
	<div>
		<BaseSearchBar
			v-model="searchText"
			placeholder="Search"
			@search="handleSearch"
		/>
	</div>
</template>

<script setup lang="ts">
	const searchText = ref('');

	const handleSearch = (query: string) => {};
</script>
