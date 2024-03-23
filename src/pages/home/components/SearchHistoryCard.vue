<template>
	<ContentCard v-if="store.history.length > 0">
		<button :class="$style.button" :key="h.ts" @click="() => navigateToLeaderboard(h.region, h.name)" v-for="h of store.history">
			{{ h.region }}
			{{ capitalise(h.name) }}
			({{ formatDistanceToNow(h.ts, { addSuffix: true }) }})
		</button>
	</ContentCard>
</template>

<script lang="ts" setup>
	import { capitalise } from "@/utils"
	import { ContentCard } from "@/components"
	import { formatDistanceToNow } from "date-fns"
	import { type RegionEnum } from "@/data"
	import { useMainStore } from "@/stores"
	import { useNavigation } from "../hooks"

	const { navigateToGuildLeaderboard } = useNavigation()
	const store = useMainStore()

	function navigateToLeaderboard(region: RegionEnum, name: string) {
		store.addGuildToHistory(region, name)
		navigateToGuildLeaderboard(region, name)
	}
</script>

<style module>
	.button {
		background-color: var(--colour-teal);
		grid-column: 1/3;
	}
</style>
