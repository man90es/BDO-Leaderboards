<template>
	<div class="loading-banner-wrapper" :class="{ 'mobile-layout': $store.state.mobile }">
		<div class="banner">
			{{ $store.state.loadingStage }}
			<router-link to="../../" class="select-guild">Go back to guild selection</router-link>
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
		background-color: #0005;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.banner {
		background-color: #21252b;
		font-size: 1.5rem;
		border-radius: 0.5rem;
		height: 30vh;
		width: 30vw;
		padding: 1em;
		display: flex;
		text-align: center;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.mobile-layout .banner {
		width: 100vw;
		height: 100vh;
	}

	.loading-banner-wrapper .select-guild {
		font-size: 0.7em;
		margin: 1em;
	}
</style>
