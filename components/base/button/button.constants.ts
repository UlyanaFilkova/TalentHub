import type { ColorClasses } from './button.types';

export const buttonColorClasses: ColorClasses = {
	primary: {
		contained: 'bg-red-5 text-white hover:bg-red-2 shadow-md',
		outlined:
			'border border-red-rgb/50 hover:border-red-5 text-red-5 bg-red-rgb/0 hover:bg-red-rgb/10',
		text: 'text-red-5 bg-red-rgb/0 hover:bg-red-rgb/10',
	},
	secondary: {
		contained: 'bg-gray-8 text-white hover:bg-gray-9 shadow-md',
		outlined:
			'border border-gray-rgb/50 hover:border-gray-rgb/100 hover:bg-gray-rgb/5 text-gray-3',
		text: 'text-gray-7 bg-gray-rgb/0 hover:bg-gray-rgb/10',
	},
};
