<template>
	<content-card>
		<h1>BDO Leaderboards</h1>
		<span>We have Black Desert Online leaderboards for your guild!</span>
	</content-card>
</template>

<script setup>
	import ContentCard from "@/components/ContentCard.vue"
</script>

<style scoped>
	.content-card > * {
		grid-column: 1/3;
		text-align: center;
	}

	h1 {
		margin: 0;
		color: var(--colour-black);
	}

	span {
		opacity: 0.8;
	}
</style>
