<template>
	<div v-for="header of headers" :key="header">{{ header }}</div>
</template>

<script>
	export default {
		name: 'LeaderBoardHeaderLine',
		props: ['headers'],
	}
</script>

<style scoped>
	div {
		font-weight: bold;
	}

	div:first-child, div:nth-child(4) {
		text-align: right;
	}
</style>
