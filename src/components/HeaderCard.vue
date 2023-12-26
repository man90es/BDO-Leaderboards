<template>
	<ContentCard>
		<h1>BDO Leaderboards</h1>
		<span>We have Black Desert Online leaderboards for your guild!</span>
		<div id="embellishment" @click="store.toggleSiteTheme">
			<img src="../../public/assets/spiral.svg">
		</div>
	</ContentCard>
</template>

<script setup>
	import { ContentCard } from "@/components"
	import { useMainStore } from "@/stores/main"

	const store = useMainStore()
</script>

<style scoped>
	.content-card > * {
		grid-column: 1/3;
		text-align: center;
	}

	h1 {
		margin: 0;
	}

	span {
		opacity: 0.8;
	}

	#embellishment {
		background-color: #111;
		box-shadow: 0 0 0.5em #000f;
		cursor: pointer;
		height: 4em;
		inset: -1.5em -3em auto auto;
		padding: 0.2em;
		position: absolute;
		transform: rotate3d(0.5, 0.5, 0.3, -45deg);
		transition: 0.3s;
		width: 4em;

		&:hover {
			height: 4.1em;
			width: 4.1em;
			transform: rotate3d(0.5, 0.5, 0.3, -30deg);
			box-shadow: 0 0 1em #0008;
		}
	}

	.light-theme #embellishment img {
		filter: brightness(5);
	}

	.mobile-layout #embellishment,
	#leaderboard-page #embellishment {
		display: none;
	}
</style>
