<template module>
	<div :class="$style.root" v-for="header of headers" :key="header ?? ''">
		{{ header }}
	</div>
</template>

<script setup lang="ts">
	import { computed } from "vue"
	import { useDiscipline } from "../hooks"

	const discipline = useDiscipline()

	const headers = computed(() => {
		const thrirdCol = "level" === discipline.value ? "Character" : null

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

<style module>
	.root {
		padding: 0.5rem;
		font-weight: bold;
	}

	.root:first-child,
	.root:nth-child(4) {
		text-align: right;
	}
</style>
