<template>
	<div class="loading-banner-wrapper">
		<div class="banner">
			{{ $store.state.loadingStage }}
		</div>
	</div>
</template>

<script>
	export default {
		name: 'LoadingBanner'
	}
</script>

<style>
	.loading-banner-wrapper {
		position: fixed;
		top: 0;
		height: 100vh;
		width: 100vw;
		background-color: #0002;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.banner {
		background-color: #21252b;
		font-size: 1.5rem;
		border-radius: 0.5rem;
		height: 20vh;
		width: 20vw;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
