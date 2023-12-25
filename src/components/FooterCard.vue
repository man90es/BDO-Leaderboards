<template>
	<content-card>
		<a href="https://github.com/man90es/BDO-Leaderboards" target="_blank" :style="{ backgroundImage: assets.star }">Give BDO Leaderboards a star on GitHub!</a>
		<a href="https://github.com/man90es/BDO-REST-API" target="_blank" :style="{ backgroundImage: assets.construction }">Curious about the API?</a>
		<a href="https://www.hemlo.cc/finances" target="_blank" :style="{ backgroundImage: assets.donate }">Support the service</a>
	</content-card>
</template>

<script setup>
	import ContentCard from "@/components/ContentCard.vue"

	const assets = {
		construction: `url(${process.env.BASE_URL}assets/construction_black_24dp.svg)`,
		donate: `url(${process.env.BASE_URL}assets/paid_black_24dp.svg)`,
		star: `url(${process.env.BASE_URL}assets/star_black_24dp.svg)`,
	}
</script>


<style scoped>
	.content-card > * {
		grid-column: 1/3;
	}

	a {
		color: var(--colour-black);
		padding-left: 1.25em;
		background-repeat: no-repeat;
		background-size: contain;
		grid-column: 1/3;
		font-size: 0.9em;
		filter: var(--dark-theme-invert);
		transition: 0.2s;
	}
</style>
