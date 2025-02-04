import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./**/*.{vue,ts}'],
	theme: {
		extend: {
			colors: {
				'dark-1': 'var(--color-dark-1)',
				'dark-2': 'var(--color-dark-2)',
				'dark-3': 'var(--color-dark-3)',
				'dark-4': 'var(--color-dark-4)',
				'dark-5': 'var(--color-dark-5)',

				'gray-1': 'var(--color-gray-1)',
				'gray-2': 'var(--color-gray-2)',
				'gray-3': 'var(--color-gray-3)',
				'gray-4': 'var(--color-gray-4)',
				'gray-5': 'var(--color-gray-5)',
				'gray-6': 'var(--color-gray-6)',
				'gray-7': 'var(--color-gray-7)',
				'gray-8': 'var(--color-gray-8)',
				'gray-9': 'var(--color-gray-9)',
				'gray-10': 'var(--color-gray-10)',

				'red-1': 'var(--color-red-1)',
				'red-2': 'var(--color-red-2)',
				'red-3': 'var(--color-red-3)',
				'red-4': 'var(--color-red-4)',
				'red-5': 'var(--color-red-5)',

				white: 'var(--color-white)',

				'red-rgb': 'rgb(var(--color-red-rgb) / <alpha-value>)',
				'gray-rgb': 'rgb(var(--color-gray-rgb) / <alpha-value>)',
			},
			fontFamily: {
				sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
			},
		},
	},
	plugins: [],
};

export default config;
