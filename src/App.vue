<template>
	<router-view/>
	<LoadingBanner v-if="$store.state.loadingStage" />
</template>

<script>
	import LoadingBanner from './components/LoadingBanner.vue'

	export default {
		name: 'App',
		components: { LoadingBanner },
		created () {
			if (sessionStorage.redirect) {
				const redirect = sessionStorage.redirect
				delete sessionStorage.redirect
				this.$router.push(redirect)
			}
		}
	}
</script>

<style>
	#app {
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
