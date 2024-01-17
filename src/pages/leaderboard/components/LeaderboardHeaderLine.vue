<template>
	<div v-for="header of headers" :key="header ?? ''">{{ header }}</div>
</template>

<script setup lang="ts">
	import { computed } from "vue"
	import { useDiscipline } from "../hooks"

	const discipline = useDiscipline()

	const headers = computed(() => {
		const thrirdCol = ["contribution", "combat", "life", "characters", "age"].includes(discipline.value)
			? null
			: "Character"

		const fourthCol = {
			contribution: "CP",
			level: "Level",
			combat: "Combat Fame",
			life: "Life Fame",
			characters: "Characters",
			age: "Age",
		}[discipline.value] ?? "Rank"

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
