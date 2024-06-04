<template>
	<div
		id="leaderboard-page"
		:class="{ 'mobile-layout': isMobile }"
	>
		<HeaderCard />
		<NavCard :guildName="data.guild.name" />
		<FooterCard id="footer" />
		<div id="leaderboard-wrapper">
			<LeaderboardCard
				:refreshData
				:data
			/>
			<AddToCustomCard
				:refreshLeaderboard="refreshData"
				v-if="route.name === routeNameEnum.CUSTOM_LEADERBOARD"
			/>
		</div>
	</div>
</template>

<script setup>
	import { AddToCustomCard, LeaderboardCard, NavCard } from "./components"
	import { capitalise } from "@/utils"
	import { computed } from "vue"
	import { FooterCard, HeaderCard } from "@/components"
	import { routeNameEnum } from "@/router"
	import { siteName } from "@/data"
	import { useHead } from "@vueuse/head"
	import { useIsMobile } from "@/hooks"
	import { useMainStore } from "@/stores"
	import { useRoute } from "vue-router"
	import useGuild from "@/hooks/API"

	const isMobile = useIsMobile()
	const route = useRoute()
	const store = useMainStore()
	useHead({
		title: computed(() => {
			const guildName = capitalise(route.name === routeNameEnum.CUSTOM_LEADERBOARD ? "Custom" : route.params.guildName)
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
</script>

<style scoped>
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

			&>.bs-card {
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
</style>
