<template>
	<div v-for="header of headers" :key="header ?? ''">{{ header }}</div>
</template>

<script setup lang="ts">
	import { computed } from "vue"
	import { useRoute } from "vue-router"

	const route = useRoute()

	const headers = computed(() => {
		const discipline = Array.isArray(route.params.discipline)
			? route.params.discipline[0]
			: route.params.discipline

		const thrirdCol = ["contribution", "combat", "life", "characters", "age"].includes(discipline)
			? null
			: "Character"

		const fourthCol = {
			contribution: "CP",
			level: "Level",
			combat: "Combat Fame",
			life: "Life Fame",
			characters: "Characters",
			age: "Age",
		}[discipline] ?? "Rank"

		return ["#", "Family Name", thrirdCol, fourthCol]
	})
</script>

<style scoped>
	#leaderboard > * {
		padding: 0.5rem;
	}

	div {
		font-weight: bold;
	}

	div:first-child,
	div:nth-child(4) {
		text-align: right;
	}
</style>
