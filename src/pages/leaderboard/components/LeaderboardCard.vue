<template>
	<ContentCard v-if="1 === data.progress" id="leaderboard">
		<LeaderboardHeaderLine v-if="data.players.length > 0" />
		<span :class="$style.fetchError" v-else>
			{{ data.errors[0]?.message }}
		</span>
		<LeaderboardLine :key="p.profile.familyName" :refreshLeaderboard="refreshData" v-bind="p" v-for="p in leaderboardItems" />
	</ContentCard>
	<LoadingCard v-else id="leaderboard" :progress="data.progress" />
</template>

<script setup lang="ts">
	import { computed } from "vue"
	import { ContentCard } from "@/components"
	import { generateLeaderboardItems } from "../logic"
	import { LeaderboardHeaderLine, LeaderboardLine, LoadingCard } from "."
	import { PrivacyLevelEnum } from "@/data"
	import { routeNameEnum } from "@/router"
	import { useDiscipline } from "../hooks"
	import { useRoute } from "vue-router"
	import type { APIResult } from "@/hooks/API"

	const route = useRoute()
	const props = defineProps<{
		data: APIResult
		refreshData: () => void
	}>()
	const discipline = useDiscipline()

	const leaderboardItems = computed(() => {
		if (props.data.progress < 1) {
			return []
		}

		const players = route.name === routeNameEnum.CUSTOM_LEADERBOARD
			? props.data.players
			: props.data.players.filter((player) => {
				// The official website does not always update when someone leaves the guild; this should filter some ex-members out
				// I have no idea how to filter out ex-members with private guild setting though

				if (player.guild !== undefined && player.guild.name.toLowerCase() == props.data.guild.name.toLowerCase()) {
					// They are probably in the guild: double checked
					return true
				} else if (player.privacy & PrivacyLevelEnum.GUILD) {
					// The guild in the profile is set to private: can't double check
					return true
				} else {
					// Either no guild or other guild
					return false
				}
			})

		return generateLeaderboardItems(discipline.value, players)
	})
</script>

<style scoped>
	#leaderboard {
		display: grid;
		gap: 0;
		grid-template-columns: 2.5rem 1fr 1fr 1fr;
		grid-template-rows: repeat(auto-fit, 2.5em);
		padding: 1em 0;
		height: fit-content;
	}
</style>

<style module>
	.fetchError {
		grid-column: 1/5;
		text-align: center;
	}
</style>
