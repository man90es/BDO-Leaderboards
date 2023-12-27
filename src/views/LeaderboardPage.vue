<template>
	<div id="leaderboard-page" :class="{ 'mobile-layout': isMobile }">
		<HeaderCard />
		<NavCard :guildName="data.guild.name" />
		<FooterCard id="footer" />
		<div id="leaderboard-wrapper">
			<ContentCard v-if="1 === data.progress" id="leaderboard">
				<LeaderboardHeaderLine v-if="data.players.length > 0" />
				<span id="fetch-error" v-else>
					{{ data.errors[0]?.message }}
				</span>
				<LeaderboardLine :key="p.profile.familyName" :refreshLeaderboard="refreshData" v-bind="p" v-for="p in leaderboardItems" />
			</ContentCard>
			<LoadingCard v-else id="leaderboard" :progress="data.progress" />
			<AddToCustomCard :refreshLeaderboard="refreshData" v-if="route.name === routeNameEnum.CUSTOM_LEADERBOARD" />
		</div>
	</div>
</template>

<script setup>
	import { AddToCustomCard, ContentCard, FooterCard, HeaderCard, LeaderboardHeaderLine, LeaderboardLine, LoadingCard, NavCard } from "@/components"
	import { capitalize } from "lodash"
	import { computed } from "vue"
	import { routeNameEnum } from "@/router"
	import { siteName } from "@/data"
	import { useHead } from "@vueuse/head"
	import { useIsMobile } from "@/hooks"
	import { useMainStore } from "@/stores"
	import { useRoute } from "vue-router"
	import generateLeaderboardItems from "@/core/generateLeaderboardItems"
	import useGuild from "@/hooks/API"

	const isMobile = useIsMobile()
	const route = useRoute()
	const store = useMainStore()
	useHead({
		title: computed(() => {
			const guildName = capitalize(route.name === routeNameEnum.CUSTOM_LEADERBOARD ? "Custom" : route.params.guildName)
			const discipline = ({
				age: "account age",
				characters: "number of characters",
				combat: "combat fame",
				contribution: "CP",
				life: "life fame",
			})[route.params.discipline] || route.params.discipline

			return `${guildName} ${discipline} ranking | ${siteName}`
		})
	})

	const { result: data, refresh: refreshData } = useGuild(computed(() => (
		route.name === routeNameEnum.CUSTOM_LEADERBOARD
			? {
				players: store.customList
			}
			: {
				guildName: route.params.guildName,
				region: route.params.region,
			}
	)))

	const leaderboardItems = computed(() => {
		if (data.progress < 1) {
			return []
		}

		const players = route.name === routeNameEnum.CUSTOM_LEADERBOARD
			? data.players
			: data.players.filter((player) => {
				// The official website does not always update when someone leaves the guild; this should filter some ex-members out
				// I have no idea how to filter out ex-members with private guild setting though

				if (player.guild !== undefined && player.guild.name.toLowerCase() == data.guild.name.toLowerCase()) {
					// They are probably in the guild: double checked
					return true
				} else if (player.privacy & 0b10) {
					// The guild in the profile is set to private: can't double check
					return true
				} else {
					// Either no guild or other guild
					return false
				}
			})

		return generateLeaderboardItems(route.params.discipline, players)
	})
</script>

<style lang="scss" scoped>
	#leaderboard-page {
		margin: 0.5em 0.5em;
		display: grid;
		gap: 0.5em;

		#leaderboard-wrapper {
			display: flex;
			flex-direction: column;
			gap: inherit;
		}

		&:not(.mobile-layout) {
			grid-template-columns: 1fr 2fr 1fr;

			& > .content-card {
				grid-column: 1;
			}

			#leaderboard-wrapper {
				grid-column: 2;
				grid-row: 1/5;
			}
		}

		&.mobile-layout {
			grid-template-columns: 1fr;

			#leaderboard {
				font-size: 0.7em;
			}

			#footer {
				margin-top: -0.5em;
				grid-row: 5;
			}
		}
	}

	#leaderboard {
		display: grid;
		gap: 0;
		grid-template-columns: 2.5rem 1fr 1fr 1fr;
		grid-template-rows: repeat(auto-fit, 2.5em);
		padding: 1em 0;
		height: fit-content;
	}

	#fetch-error {
		grid-column: 1/5;
		text-align: center;
	}
</style>
