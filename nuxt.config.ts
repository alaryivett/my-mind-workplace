// https://nuxt.com/docs/api/configuration/nuxt-config
// TODO nuxt-icon
export default defineNuxtConfig({
	devtools: { enabled: false },
	modules: [
		'@pinia/nuxt',
		'nuxt-icon',
	],
	pinia: {
		storesDirs: ['./store/**']
	},
	css: [
		'normalize.css/normalize.css',
		'~/assets/styles/main.sass'
	],
	vite: {
		css: {
			preprocessorOptions: {
				sass: {
					additionalData: '@use "~/assets/styles/_vars.sass" as *\n'
				}
			}
		}
	}
})
