<template>
	<div
		class="bs-card"
		v-if="store.history.length > 0"
	>
		<button
			class="bs-button-teal"
			:key="ts"
			@click="() => navigateToLeaderboard(region, name)"
			v-for="{ region, name, ts } of store.history"
		>
			{{ region }}
			{{ capitalise(name) }}
			({{ formatDistanceToNow(ts, { addSuffix: true }) }})
		</button>
	</div>
</template>

<script lang="ts" setup>
	import { capitalise } from "@/utils"
	import { formatDistanceToNow } from "date-fns"
	import { useMainStore } from "@/stores"
	import { useNavigation } from "../hooks"
	import type { RegionEnum } from "@/data"

	const { navigateToGuildLeaderboard } = useNavigation()
	const store = useMainStore()

	function navigateToLeaderboard(region: RegionEnum, name: string) {
		store.addGuildToHistory(region, name)
		navigateToGuildLeaderboard(region, name)
	}
</script>

<style scoped>
	.bs-button-teal {
		grid-column: 1/3;
	}
</style>
