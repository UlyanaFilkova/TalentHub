<template>
	<div class="flex min-h-screen flex-col bg-background">
		<div class="flex flex-1 gap-6">
			<Sidebar class="w-48 pt-10" />

			<div class="flex flex-1 flex-col gap-3">
				<TheHeader class="h-10" />
				<main class="flex-1">
					<NuxtPage />
				</main>
			</div>
		</div>
	</div>
</template>
