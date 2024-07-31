/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'/node_modules/preline/dist/*.js',
		"/node_modules/flowbite/**/*.js"
		],
	theme: {
		extend: {},
	},
	plugins: [
		require('preline/plugin'),
		require('flowbite/plugin'),
		require('@tailwindcss/typography'),
	],
	variants: {
		extend: {
			display: ["group-hover"],
		},
	},
}

