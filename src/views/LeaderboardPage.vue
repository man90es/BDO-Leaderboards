<template>
	<div id="leaderboard-page" :class="{ 'mobile-layout': mobile }">
		<header-card />

		<content-card>
			<h2 id="guild-link">
				<a v-if="route.name !== 'customLeaderboard'" :href="guildLink" target="_blank">
					Guild: {{ data.guildName || route.params.guildName }}
				</a>
				<span v-else>Custom Leaderboard</span>
			</h2>
			<router-link to="/" class="select-guild-link">Select another</router-link>

			<category-links />
		</content-card>

		<footer-card id="footer" />

		<div id="leaderboard-wrapper">
			<content-card v-if="1 === data.progress" id="leaderboard">
				<leader-board-header-line v-if="data.players.length > 0" />
				<span id="fetch-error" v-else>
					{{data.errors[0]}}
				</span>
				<leaderboard-line
					:key="p.profile.familyName"
					:refreshLeaderboard="refreshData"
					v-bind="p"
					v-for="p in leaderboardItems"
				/>
			</content-card>
			<loading-card v-else id="leaderboard" :progress="data.progress" />

			<add-to-custom-card
				:refreshLeaderboard="refreshData"
				id="add-to-custom"
				v-if="route.name === 'customLeaderboard'"
			/>
		</div>
	</div>
</template>

<script setup>
	import { capitalise } from "../utils"
	import { computed } from "vue"
	import { supportedServers } from "@/utils"
	import { useHead } from "@vueuse/head"
	import { useMainStore } from "@/stores/main"
	import { useRoute } from "vue-router"
	import AddToCustomCard from "@/components/AddToCustomCard.vue"
	import CategoryLinks from "@/components/CategoryLinks.vue"
	import ContentCard from "@/components/ContentCard.vue"
	import FooterCard from "@/components/FooterCard.vue"
	import generateLeaderboardItems from "@/core/generateLeaderboardItems"
	import HeaderCard from "@/components/HeaderCard.vue"
	import LeaderBoardHeaderLine from "@/components/LeaderBoardHeaderLine.vue"
	import LeaderboardLine from "@/components/LeaderboardLine.vue"
	import LoadingCard from "@/components/LoadingCard.vue"
	import useGuild from "@/hooks/API"
	import useMobile from "@/hooks/mobile"

	const mobile = useMobile()
	const route = useRoute()
	const store = useMainStore()
	useHead({
		title: computed(() => {
			const guildName = capitalise(route.name === "customLeaderboard" ? "Custom" : route.params.guildName)
			const discipline = ({
				age: "account age",
				characters: "number of characters",
				combat: "combat fame",
				contribution: "CP",
				life: "life fame",
			})[route.params.discipline] || route.params.discipline

			return `${guildName} ${discipline} ranking | ${process.env.VUE_APP_SITE_NAME}`
		})
	})

	const { result: data, refresh: refreshData } = useGuild(computed(() => (
		route.name === "customLeaderboard"
			? {
				players: store.customList
			}
			: {
				guildName: route.params.guildName,
				region: route.params.region,
			}
	)))

	const guildLink = computed(() => {
		const server = [...supportedServers.values()]
			.find(s => route.params.region === s.domain)

		return server.getGuildLink(route.params.guildName)
	})

	const leaderboardItems = computed(() => {
		if (data.progress < 1) {
			return []
		}

		const players = route.name === "customLeaderboard"
			? data.players
			: data.players
				.filter((player) => {
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

	#guild-link {
		margin: 0;
		text-align: center;
		grid-column: 1/3;

		a {
			opacity: 1;
		}
	}

	.select-guild-link {
		color: inherit;
		text-align: center;
		grid-column: 1/3;
		margin-bottom: 1em;
	}

	#fetch-error {
		grid-column: 1/5;
		text-align: center;
	}
</style>
