<template>
	<div class="flex min-h-screen flex-col bg-background">
		<div class="flex flex-1 items-stretch gap-6 pr-3">
			<Sidebar class="pt-12" />

			<div class="flex flex-1 flex-col gap-3 overflow-hidden">
				<TheHeader class="h-12" />
				<main class="flex-1">
					<slot></slot>
				</main>
			</div>
		</div>
	</div>
</template>
