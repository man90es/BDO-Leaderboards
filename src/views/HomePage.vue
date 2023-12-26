<template>
	<div id="home-page" :class="{ 'mobile-layout': mobile }">
		<HeaderCard />
		<ContentCard>
			<input autocapitalize="on" type="text" :class="{ highlighted: shouldHightlightNameInput }" placeholder="Enter the guild's name here" v-model="guildName" v-on:keyup.enter="() => navigateToLeaderboard()" />
			<button :key="server.domain" :style="{ backgroundColor: server.colour }" @click="() => navigateToLeaderboard(server.domain)" v-for="server of supportedServers">
				Look it up in {{server.name}}
			</button>
			<SeparatorLine>OR</SeparatorLine>
			<button :style="{ backgroundColor: 'var(--colour-green)' }" @click="navigateToCustomLeaderboard" class="wide-button">
				Create a leaderboard from scratch
			</button>
		</ContentCard>
		<FooterCard />
	</div>
</template>

<script setup>
	import { ContentCard, FooterCard, HeaderCard, SeparatorLine } from "@/components"
	import { ref } from "vue"
	import { supportedServers } from "@/data"
	import { useHead } from "@vueuse/head"
	import { useMainStore } from "@/stores/main"
	import { useRouter } from "vue-router"
	import useMobile from "@/hooks/mobile"

	const mobile = useMobile()
	const router = useRouter()
	const store = useMainStore()
	useHead({ title: process.env.VUE_APP_SITE_NAME })

	const guildName = ref("")
	const shouldHightlightNameInput = ref(false)

	const defaultDiscipline = "level"

	if (store.lastGuild.name !== null) {
		guildName.value = store.lastGuild.name
	}

	function navigateToCustomLeaderboard() {
		router.push({
			name: "customLeaderboard",
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
			if (!store.lastGuild.region) {
				return
			}

			region = store.lastGuild.region
		}

		// Memorise the last guild
		store.lastGuild = {
			name: guildName.value,
			region
		}

		// Navigate to the leaderboard
		router.push({
			name: "leaderboard",
			params: {
				region,
				guildName: guildName.value,
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
			margin: 0;
			text-align: center;
			text-transform: capitalize;

			&::placeholder {
				text-transform: none;
			}
		}

		.wide-button {
			grid-column: 1/3;
		}
	}

	input.highlighted {
		box-shadow: 0 0 0.5em var(--colour-red) !important;
	}
</style>
