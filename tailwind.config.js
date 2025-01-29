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
				'profilepic-color': 'var(--color-profilepic-background)',
				'upload-color': 'var(--color-uploadfile-text)',
				'second-color': 'var(--color-second-text)',
				'accent-color': 'var(--color-accent-color)',
				'low-contrast-color': 'var(--color-low-contrast)',
				'profilepic-color': 'var(--color-profilepic-background)',
				'options-backgroud': 'var(--color-options-background)',
				'options-backgroud-hover': 'var(--color-options-background-hover)',

				button: {
					primary: {
						contained: {
							background: 'var(--color-button-primary-contained-background)',
							text: 'var(--color-button-primary-contained-text)',
							hover: 'var(--color-button-primary-contained-hover)',
						},
						outlined: {
							border:
								'rgb(var(--color-button-primary-outlined-border) / <alpha-value>)',
							borderHover: 'var(--color-button-primary-outlined-border-hover)',
							text: 'var(--color-button-primary-outlined-text)',
							background:
								'rgb(var(--color-button-primary-outlined-background) / <alpha-value>)',
						},
						text: {
							text: 'var(--color-button-primary-text-text)',
							background:
								'rgb(var(--color-button-primary-text-background) / <alpha-value>)',
						},
					},
					secondary: {
						contained: {
							background: 'var(--color-button-secondary-contained-background)',
							text: 'var(--color-button-secondary-contained-text)',
							hover: 'var(--color-button-secondary-contained-hover)',
						},
						outlined: {
							border:
								'rgb(var(--color-button-secondary-outlined-border) / <alpha-value>)',
							borderHover:
								'var(--color-button-secondary-outlined-border-hover)',
							text: 'var(--color-button-secondary-outlined-text)',
							background:
								'rgb(var(--color-button-secondary-outlined-background) / <alpha-value>)',
						},
						text: {
							text: 'var(--color-button-secondary-text-text)',
							background:
								'rgb(var(--color-button-secondary-text-background) / <alpha-value>)',
						},
					},
				},
				input: {
					border: 'var(--color-input-border)',
					borderFocus: 'var(--color-input-border-focus)',
					borderHover: 'var(--color-input-border-hover)',
					background: 'var(--color-input-background)',
					label: 'var(--color-input-label)',
					labelBackground: 'var(--color-input-label-background)',
					labelFocus: 'var(--color-input-label-focus)',
					text: 'var(--color-input-text)',
				},
				dropdown: {
					button: {
						background: 'var(--color-dropdown-button-background)',
						backgroundHover: 'var(--color-dropdown-button-background-hover)',
						backgroundSelected:
							'var(--color-dropdown-button-background-selected)',
						backgroundSelectedHover:
							'var(--color-dropdown-button-background-selected-hover)',
					},
				},
			},
			fontFamily: {
				sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
			},
		},
	},
	plugins: [],
};
