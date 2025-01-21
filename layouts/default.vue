<template>
	<div class="bg-background flex min-h-screen flex-col">
		<div class="flex flex-1 gap-6">
			<TheSidebar class="w-52" />

			<div class="flex flex-1 flex-col gap-3">
				<TheHeader class="h-10" />
				<main class="flex-1">
					<NuxtPage />
				</main>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
