<template>
	<li class="flex items-center">
		<template v-if="!isLast">
			<a
				:href="breadcrumb.link"
				class="hover:underline"
				:class="{ 'text-accent-color': index === 1 }"
			>
				<p>{{ breadcrumb.label }}</p>
			</a>
			<span aria-hidden="true" class="mx-2">
				<IconsBackArrow
					:is-toggled="true"
					color="var(--color-second-text)"
					width="14px"
				/>
			</span>
		</template>

		<template v-else>
			<p :class="{ 'text-accent-color': index === 1 }">
				{{ breadcrumb.label }}
			</p>
		</template>
	</li>
</template>

<script setup lang="ts">
	defineProps<{
		breadcrumb: { label: string; link: string };
		index: number;
		isLast: boolean;
	}>();
</script>
