<template>
	<router-view/>
	<LoadingBanner v-if="$store.state.loadingStage" />
</template>

<script>
	import LoadingBanner from './components/LoadingBanner.vue'

	export default {
		name: 'App',
		components: { LoadingBanner }
	}
</script>

<style>
	body {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		min-height: 100vh;
		background-color: #21252b;
		color: #bbc;
	}

	* {
		box-sizing: border-box;
	}
</style>
