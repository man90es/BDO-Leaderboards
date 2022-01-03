<template>
	<content-card>
		<a href="https://github.com/octoman90/BDO-Leaderboards" target="_blank" :style="{ backgroundImage: assets.star }">Give me a star on GitHub!</a>
		<a href="https://github.com/octoman90/BDO-REST-API" target="_blank" :style="{ backgroundImage: assets.construction }">Curious about the API?</a>
		<a href="https://github.com/octoman90/BDO-Leaderboards/issues" target="_blank" :style="{ backgroundImage: assets.bug }">Found a bug?</a>
	</content-card>
</template>

<script setup>
	import ContentCard from "@/components/ContentCard.vue"

	const assets = {
		star: `url(${process.env.BASE_URL}assets/star_black_24dp.svg)`,
		construction: `url(${process.env.BASE_URL}assets/construction_black_24dp.svg)`,
		bug: `url(${process.env.BASE_URL}assets/bug_report_black_24dp.svg)`,
	}
</script>


<style scoped>
	.content-card > * {
		grid-column: 1/3;
	}

	a {
		color: var(--colour-black);
		text-decoration: none;
		opacity: 0.5;
		padding-left: 1.25em;
		background-repeat: no-repeat;
		background-size: contain;
		grid-column: 1/3;
		font-size: 0.9em;
	}

	a:hover {
		opacity: 0.8;
	}
</style>
