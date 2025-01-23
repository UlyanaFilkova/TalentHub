/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./components/**/*.{js,vue,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./app.vue',
		'./error.vue',
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--color-global-background)',
				'sidebar-hover': 'var(--color-sidebar-hover)',
				'active-color': 'var(--color-active-text)',
				'inactive-color': 'var(--color-inactive-text)',
				'second-color': 'var(--color-second-text)',
			},
			fontFamily: {
				sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
			},
		},
	},
	plugins: [],
};
