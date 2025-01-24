<template>
	<div class="h-[calc(100vh-0.75rem-90px)]">
		<BaseSearchBar
			v-model="searchQuery"
			placeholder="Search"
			@search="handleSearch"
		/>
		<div class="max-h-full overflow-y-auto">
			<UsersTable :search-query="searchQuery" />
		</div>
	</div>
</template>

<script setup lang="ts">
	const searchQuery = ref('');

	const handleSearch = (query: string) => {};
</script>
