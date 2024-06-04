<template>
	<div class="bs-card">
		<input
			class="bs-input"
			placeholder="Enter guild name"
			v-model="guildName"
		/>
		<button
			:class="className"
			:key="domain"
			@click="() => navigateToLeaderboard(domain)"
			v-for="{ className, domain, name } of supportedServers"
		>
			Look it up in {{ name }}
		</button>
		<div class="bs-divider-line">OR</div>
		<button
			@click="navigateToCustomLeaderboard"
			class="bs-button-green"
		>
			{{ store.customList.length > 0 ? "Open" : "Create a" }} custom leaderboard
		</button>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from "vue"
	import { type RegionEnum, supportedServers } from "@/data"
	import { useMainStore } from "@/stores"
	import { useNavigation } from "../hooks"

	const { navigateToCustomLeaderboard, navigateToGuildLeaderboard } = useNavigation()
	const store = useMainStore()

	const guildName = ref("")
	const isError = ref(false)

	function navigateToLeaderboard(region: RegionEnum) {
		// If guild name input is empty, highlight it and exit
		if (guildName.value.length < 1) {
			isError.value = true
			return
		}

		store.addGuildToHistory(region, guildName.value)
		navigateToGuildLeaderboard(region, guildName.value)
	}
</script>

<style scoped>

	.bs-divider-line,
	.bs-input,
	.bs-button-green {
		grid-column: 1/3;
	}
</style>
