<template>
	<ContentCard>
		<h1>BDO Leaderboards</h1>
		<span>Your Black Desert Online guild's leaderboard is already here!</span>
		<img id="embellishment" src="../../public/assets/spiral.svg">
	</ContentCard>
</template>

<script lang="ts" setup>
	import { ContentCard } from "@/components"
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
		height: 4em;
		inset: -1.5em -3em auto auto;
		padding: 0.2em;
		pointer-events: none;
		position: absolute;
		transform: rotate3d(0.5, 0.5, 0.3, -45deg);
		width: 4em;
	}

	.mobile-layout #embellishment,
	#leaderboard-page #embellishment {
		display: none;
	}
</style>
