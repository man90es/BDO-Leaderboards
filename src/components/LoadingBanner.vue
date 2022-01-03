<template>
	<div class="loading-banner-wrapper" :class="{ 'mobile-layout': $store.state.mobile }">
		<div class="banner">
			<radial-progress :diameter="200" :completed-steps="$store.state.loading.progress" :total-steps="$store.state.loading.total" :innerStrokeColor="innerColour" :stopColor="injectColour" :startColor="injectColour">
				{{ $store.state.loading.msg }}
			</radial-progress>
			<router-link to="/" class="select-guild" v-if="$store.state.loading.stage > 1">Go back to guild selection</router-link>
		</div>
	</div>
</template>

<script setup>
	import RadialProgress from "vue3-radial-progress"

	const innerColour = getComputedStyle(document.documentElement).getPropertyValue("--colour-grey")
	const injectColour = getComputedStyle(document.documentElement).getPropertyValue("--colour-green")
</script>

<style lang="scss" scoped>
	.loading-banner-wrapper {
		position: fixed;
		top: 0;
		height: 100vh;
		width: 100vw;
		background-color: #0005;
		display: flex;
		justify-content: center;
		align-items: center;

		.select-guild {
			font-size: 0.7em;
			margin: 1em;
		}
	}

	.banner {
		background-color: var(--colour-white);
		font-size: 1.5rem;
		border-radius: 0.1rem;
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

	a {
		color: inherit;
		opacity: 0.7;
		text-decoration: none;

		&:hover {
			opacity: 1;
		}
	}
</style>
