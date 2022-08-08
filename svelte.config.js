import adapter from '@sveltejs/adapter-auto';
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$components: 'src/components',
			$utils: 'src/utils',
			$api: 'src/api',
			$stores: 'src/stores'
		  }
	},
	preprocess: [
		preprocess({
		  postcss: true,
		}),
	  ],
};

export default config;
