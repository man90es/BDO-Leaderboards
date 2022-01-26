<template>
	<content-card>
		<h1>BDO Leaderboards</h1>
		<span>We have Black Desert Online leaderboards for your guild!</span>
		<div id="embellishment">
			<img src="../../public/assets/spiral.svg">
		</div>
	</content-card>
</template>

<script setup>
	import ContentCard from "@/components/ContentCard.vue"
</script>

<style lang="scss" scoped>
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
		height: 4em;
		width: 4em;
		transform: rotate3d(0.5, 0.5, 0.3, -45deg);
		position: absolute;
		top: -1.5em;
		right: -3em;
		padding: 0.1em;
		background-color: #111111;
		box-shadow: 0 0 0.5em #000;
	}

	.light-theme #embellishment img {
		filter: brightness(5);
	}

	.mobile-layout #embellishment, #leaderboard-page #embellishment {
		display: none;
	}
</style>
