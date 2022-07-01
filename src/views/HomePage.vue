<template>
	<div id="home-page" :class="{ 'mobile-layout': $store.state.mobile }">
		<header-card />

		<content-card>
			<formatted-input :class="{ highlighted: shouldHightlightNameInput }" placeholder="Enter the guild's name here" v-model="guildName" v-on:keyup.enter="() => navigateToLeaderboard()" />
			<button class="eu-colour" @click="() => navigateToLeaderboard('EU')">Look it up in Europe</button>
			<button class="na-colour" @click="() => navigateToLeaderboard('NA')">Look it up in North America</button>
			<separator-line>OR</separator-line>
			<button class="custom-colour wide-button" @click="() => navigateToCustomLeaderboard()">Create a leaderboard from scratch</button>
		</content-card>

		<footer-card />
	</div>
</template>

<script setup>
	import { ref } from "vue"
	import { useHead } from "@vueuse/head"
	import { useRouter } from "vue-router"
	import { useStore } from "vuex"
	import ContentCard from "@/components/ContentCard.vue"
	import FooterCard from "@/components/FooterCard.vue"
	import FormattedInput from "@/components/FormattedInput.vue"
	import HeaderCard from "@/components/HeaderCard.vue"
	import SeparatorLine from "@/components/SeparatorLine.vue"

	const router = useRouter()
	const store = useStore()
	useHead({ title: process.env.VUE_APP_SITE_NAME })

	const guildName = ref("")
	const shouldHightlightNameInput = ref(false)

	const defaultDiscipline = "level"

	if (store.state.lastGuild.name !== null) {
		guildName.value = store.state.lastGuild.name
	}

	function navigateToCustomLeaderboard() {
		router.push({
			name:   "customLeaderboard",
			params: { discipline: defaultDiscipline }
		})
	}

	function navigateToLeaderboard(region) {
		// If guild name input is empty, highlight it and exit
		if (guildName.value.length < 1) {
			shouldHightlightNameInput.value = true
			return
		}

		// If the region is not provided, fall back to the last one if possible
		// Or exit if not
		if (region === undefined) {
			if (store.state.lastGuild.region !== null) {
				region = store.state.lastGuild.region
			} else {
				return
			}
		}

		// Memorise the last guild
		store.commit("setLastGuild", { name: guildName.value, region })

		// Navigate to the leaderboard
		router.push({
			name: "leaderboard",
			params: {
				region,
				guildName:  guildName.value,
				discipline: defaultDiscipline,
			}
		})
	}
</script>

<style lang="scss" scoped>
	#home-page {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 0.5em;
		min-height: 100vh;

		&.mobile-layout {
			justify-content: flex-start;
			margin-top: 0.5em;

			.content-card {
				width: calc(100vw - 1em);
			}
		}

		&:not(.mobile-layout) {
			.content-card {
				min-width: 25em;
			}
		}
	}

	.content-card {
		width: 25vw;

		input {
			grid-column: 1/3;
			text-align: center;
			margin: 0;
		}

		.wide-button {
			grid-column: 1/3;
		}
	}

	input.highlighted {
		box-shadow: 0 0 0.5em var(--colour-red) !important;
	}
</style>
