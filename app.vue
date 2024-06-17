<template lang="pug">
NuxtLayout
	NuxtPage
	Loader(v-if="!loader.isLoaded")
</template>

<script setup lang="ts">
const loader = useLoaderStore()
loader.load(useAuthStore().init)
</script>
