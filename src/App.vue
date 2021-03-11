<template>
	<router-view/>
</template>

<script>
	export default {
		name: 'App'
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
		margin: 0;
		background-image: url(assets/background.webp);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-attachment: fixed;
	}

	* {
		box-sizing: border-box;
	}
</style>
