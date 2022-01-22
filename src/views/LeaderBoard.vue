<template>
	<div id="leaderboard-page" :class="{ 'mobile-layout': $store.state.mobile }">
		<header-card />

		<content-card>
			<h2 id="guild-link">
				<a v-if="$route.name !== 'customLeaderboard'" :href="guildLink" target="_blank">
					Guild: {{ $route.params.guildName }}
				</a>
				<span v-else>Custom Leaderboard</span>
			</h2>
			<router-link to="/" class="select-guild-link">Select another</router-link>

			<category-links />
		</content-card>

		<footer-card id="footer" />

		<content-card v-if="contentReady" id="leaderboard">
			<leader-board-header-line />
			<leader-board-line v-for="p in leaderboardItems" :key="p.profile.familyName" v-bind="p" />
		</content-card>
		<loading-card v-else id="leaderboard"/>

		<add-to-custom-card v-if="$route.name === 'customLeaderboard'" id="add-to-custom" />
	</div>
</template>

<script setup>
	import { computed } from "vue"
	import { useStore } from "vuex"
	import { useRoute } from "vue-router"

	import AddToCustomCard from "@/components/AddToCustomCard.vue"
	import CategoryLinks from "@/components/CategoryLinks.vue"
	import ContentCard from "@/components/ContentCard.vue"
	import FooterCard from "@/components/FooterCard.vue"
	import HeaderCard from "@/components/HeaderCard.vue"
	import LeaderBoardHeaderLine from "@/components/LeaderBoardHeaderLine.vue"
	import LeaderBoardLine from "@/components/LeaderBoardLine.vue"
	import LoadingCard from "@/components/LoadingCard.vue"

	import useGenerateLeaderboardItems from "../hooks/generateLeaderboardItems.js"

	const store = useStore()
	const route = useRoute()

	// Request guild data if it wasn't requested before
	store.commit("setShouldStopRequests", false)
	if (route.name === "customLeaderboard") {
		if (store.getters.customMembers.includes()) {
			store.dispatch("requestCustomList")
		}
	} else {
		if (!(route.params.guildName in store.state.guilds)) {
			store.dispatch("requestGuild", {
				guildName: route.params.guildName,
				region:    route.params.region,
			})
		}
	}

	const guildLink = computed(() => {
		return `https://www.naeu.playblackdesert.com/en-US/Adventure/Guild/GuildProfile?guildName=${route.params.guildName}&region=${route.params.region}`
	})
	const contentReady = computed(() => store.state.loading.stage === 2)
	const { leaderboardItems } = useGenerateLeaderboardItems()
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
			text-decoration: none;
			color: inherit;
		}
	}

	.select-guild-link {
		text-decoration: none;
		color: inherit;
		text-align: center;
		grid-column: 1/3;
		opacity: 0.7;
		margin-bottom: 1em;

		&:hover {
			opacity: 1;
		}
	}
</style>
