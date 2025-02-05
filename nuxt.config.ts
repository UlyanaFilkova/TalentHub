import graphqlLoader from 'vite-plugin-graphql-loader';

export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: false },
	modules: ['@nuxt/eslint'],
	css: ['~/assets/styles/main.css'],
	plugins: [
		'~/plugins/apolloClient',
		{ src: '~/plugins/toast', mode: 'client' },
	],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	vite: {
		plugins: [graphqlLoader()],
	},
});
