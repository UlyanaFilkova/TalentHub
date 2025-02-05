<template>
	<div class="h-[calc(100vh-0.75rem-90px)]">
		<div>
			<BaseSearchBar v-model="searchQuery" placeholder="Search" class="mb-5" />
		</div>
		<div>
			<UsersTable :search-query="searchQuery" />
		</div>
	</div>
</template>

<script setup lang="ts">
	const searchQuery = ref('');
</script>
