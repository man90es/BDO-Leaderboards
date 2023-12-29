<template>
	<ContentCard>
		<input autocapitalize="on" :class="{ [$style.input]: true, [$style.highlighted]: isError }" placeholder="Enter the guild name" v-model="guildName" />
		<button :key="s.domain" :style="{ backgroundColor: s.colour }" @click="() => navigateToLeaderboard(s.domain)" v-for="s of supportedServers">
			Look it up in {{ s.name }}
		</button>
		<DividerLine>OR</DividerLine>
		<button @click="navigateToCustomLeaderboard" :class="$style.customLeaderboardButton">
			{{ store.customList.length > 0 ? "Open" : "Create a" }} custom leaderboard
		</button>
	</ContentCard>
</template>

<script lang="ts" setup>
	import { ContentCard } from "@/components"
	import { DividerLine } from "."
	import { ref } from "vue"
	import { type RegionEnum, supportedServers } from "@/data"
	import { useMainStore } from "@/stores"
	import { useNavigation } from "@/hooks"

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

<style module>
	.input {
		grid-column: 1/3;
		margin: 0;
		text-align: center;
		text-transform: capitalize;

		&.highlighted {
			box-shadow: 0 0 0.5em var(--colour-red);
			outline: 1px solid var(--colour-red);
		}
	}

	.input::placeholder {
		text-transform: none;
	}

	.customLeaderboardButton {
		background-color: var(--colour-green);
		grid-column: 1/3;
	}
</style>
