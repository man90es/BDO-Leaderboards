<template>
	<div id="leaderboard-page" :class="{ 'mobile-layout': $store.state.mobile }">
		<header-card />

		<content-card>
			<h2 id="guild-link">
				<a v-if="$route.name !== 'customLeaderboard'" :href="guildLink" target="_blank">
					Guild: {{ data.guildName || $route.params.guildName }}
				</a>
				<span v-else>Custom Leaderboard</span>
			</h2>
			<router-link to="/" class="select-guild-link">Select another</router-link>

			<category-links />
		</content-card>

		<footer-card id="footer" />

		<content-card v-if="1 === data.progress" id="leaderboard">
			<leader-board-header-line />
			<leader-board-line v-for="p in leaderboardItems" :key="p.profile.familyName" v-bind="p" :refreshLeaderboard="refreshData" />
		</content-card>
		<loading-card v-else id="leaderboard" :progress="data.progress" />

		<add-to-custom-card v-if="$route.name === 'customLeaderboard'" id="add-to-custom" :refreshLeaderboard="refreshData" />
	</div>
</template>

<script setup>
	import { capitalise } from "../utils"
	import { computed } from "vue"
	import { useHead } from "@vueuse/head"
	import { useRoute } from "vue-router"
	import { useStore } from "vuex"
	import AddToCustomCard from "@/components/AddToCustomCard.vue"
	import CategoryLinks from "@/components/CategoryLinks.vue"
	import ContentCard from "@/components/ContentCard.vue"
	import FooterCard from "@/components/FooterCard.vue"
	import generateLeaderboardItems from "@/core/generateLeaderboardItems"
	import HeaderCard from "@/components/HeaderCard.vue"
	import LeaderBoardHeaderLine from "@/components/LeaderBoardHeaderLine.vue"
	import LeaderBoardLine from "@/components/LeaderBoardLine.vue"
	import LoadingCard from "@/components/LoadingCard.vue"
	import useGuild from "@/hooks/API"

	const store = useStore()
	const route = useRoute()
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
				players: store.state.customList.map(profileTarget => ({ region: "EU", profileTarget }))
			}
			: {
				guildName: route.params.guildName,
				region: route.params.region,
			}
	)))

	const guildLink = computed(() => {
		return `https://www.naeu.playblackdesert.com/en-US/Adventure/Guild/GuildProfile?guildName=${route.params.guildName}&region=${route.params.region}`
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

		&:not(.mobile-layout) {
			grid-template-columns: 1fr 2fr 1fr;

			.content-card:not(#leaderboard):not(#add-to-custom) {
				grid-column: 1;
			}

			#add-to-custom {
				grid-column: 2;
			}

			#leaderboard {
				grid-row: 1/5;
				grid-column: 2;
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
</style>
