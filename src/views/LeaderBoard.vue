<template>
	<div id="leader-board-page" :class="{ 'mobile-layout': $store.state.mobile }">
		<h1>
			{{ $route.params.guildName || "Custom Leaderboard" }}
			<a v-if="$route.name !== 'customLeaderboard'" :href="guildLink" target="_blank">
				<img class="guild-link" src="../assets/open_in_new_white_24dp.svg" />
			</a>
		</h1>
		<router-link to="/" class="select-guild">Go back to guild selection</router-link>
		<ul>
			<li><router-link to="./level">Character Level</router-link></li>
			<li><router-link to="./contribution">Contribution Points</router-link></li>
			<li><router-link to="./gathering">Gathering</router-link></li>
			<li><router-link to="./fishing">Fishing</router-link></li>
			<li><router-link to="./hunting">Hunting</router-link></li>
			<li><router-link to="./cooking">Cooking</router-link></li>
			<li><router-link to="./alchemy">Alchemy</router-link></li>
			<li><router-link to="./processing">Processing</router-link></li>
			<li><router-link to="./training">Training</router-link></li>
			<li><router-link to="./trading">Trading</router-link></li>
			<li><router-link to="./farming">Farming</router-link></li>
			<li><router-link to="./sailing">Sailing</router-link></li>
			<li><router-link to="./barter">Barter</router-link></li>
			<li><router-link to="./combat">Combat Fame</router-link></li>
			<li><router-link to="./life">Life Fame</router-link></li>
		</ul>

		<div id="leaderboard">
			<LeaderBoardHeaderLine />
			<LeaderBoardLine v-for="p in leaderboardItems" :key="p.profile.familyName" v-bind="p" />
		</div>

		<AddToCustom v-if="$route.name === 'customLeaderboard'" />
		<LoadingBanner v-if="shouldShowLoading" />
	</div>
</template>

<script setup>
	import { computed } from "vue"
	import { useStore } from "vuex"
	import { useRoute } from "vue-router"

	import LeaderBoardHeaderLine from "../components/LeaderBoardHeaderLine.vue"
	import LeaderBoardLine from "../components/LeaderBoardLine.vue"
	import AddToCustom from "../components/AddToCustom.vue"
	import LoadingBanner from "../components/LoadingBanner.vue"

	import useGenerateLeaderboardItems from "../hooks/generateLeaderboardItems.js"

	const store = useStore()
	const route = useRoute()

	// Request guild data if it wasn't requested before
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
	const shouldShowLoading = computed(() => {
		return store.state.loading.stage !== 2
	})
	const { leaderboardItems } = useGenerateLeaderboardItems()
</script>

<style lang="scss">
	#leader-board-page {
		display: flex;
		flex-direction: column;
		background-color: #21252b;
		min-height: 100vh;
		width: 100%;

		#leaderboard {
			display: grid;
			grid-template-columns: 3rem 1fr 1fr 1fr;

			& > * {
				padding: 0.5rem;
			}
		}

		&.mobile-layout #leaderboard {
			width: 100vw;

			& > * {
				font-size: 0.9em !important;
			}
		}

		&:not(.mobile-layout) {
			align-items: center;

			#leaderboard {
				width: 50vw;
			}
		}
	}

	ul {
		padding-left: 0;
		text-align: center;
		list-style: none;
		width: 100%;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(10em, 1fr));
		grid-gap: 1em;

		a {
			color: #fff;
			text-decoration: none;
			padding-bottom: 0.2em;
		}
	}

	h1 {
		text-align: center;
		margin-bottom: 0;
		color: #fff;
	}

	.guild-link {
		vertical-align: middle;
	}

	.router-link-exact-active {
		border-bottom: 0.15em solid #bbc
	}

	.select-guild {
		color: #bbc;
		margin-bottom: 1rem;
		opacity: 0.8;
		text-align: center;
	}
</style>
