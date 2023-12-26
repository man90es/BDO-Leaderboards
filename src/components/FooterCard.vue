<template>
	<ContentCard>
		<a href="https://github.com/man90es/BDO-Leaderboards" target="_blank" :style="{ backgroundImage: assets.star }">GitHub</a>
		<a href="https://github.com/man90es/BDO-REST-API" target="_blank" :style="{ backgroundImage: assets.construction }">API</a>
		<a href="https://www.hemlo.cc/finances" target="_blank" :style="{ backgroundImage: assets.donate }">Donate</a>
		<a href="https://github.com/man90es" target="_blank">man90 © {{ (new Date()).getFullYear() }}</a>
	</ContentCard>
</template>

<script lang="ts" setup>
	import { ContentCard } from "@/components"

	const assets = {
		construction: `url(${process.env.BASE_URL}assets/construction_black_24dp.svg)`,
		donate: `url(${process.env.BASE_URL}assets/paid_black_24dp.svg)`,
		star: `url(${process.env.BASE_URL}assets/star_black_24dp.svg)`,
	}
</script>

<style scoped>
	a {
		background-repeat: no-repeat;
		background-size: contain;
		color: var(--colour-black);
		filter: invert(1);
		font-size: 0.9em;
		padding-left: 1.5em;
		transition: 0.2s;

		&:last-child {
			padding-left: 0;
		}
	}
</style>
