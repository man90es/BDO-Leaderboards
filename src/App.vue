<template>
	<router-view/>
</template>

<script setup>
	import useUpdateTitle from "./hooks/updateTitle.js"
	import useUpdateMobile from "./hooks/updateMobile.js"

	useUpdateMobile()
	useUpdateTitle()
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

	#app {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		min-height: 100vh;
		gap: 1em;
	}

	* {
		box-sizing: border-box;
	}
</style>
