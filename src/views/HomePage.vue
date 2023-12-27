<template>
	<div id="home-page" :class="{ 'mobile-layout': isMobile }">
		<HeaderCard />
		<ContentCard>
			<input autocapitalize="on" :class="{ highlighted: shouldHightlightNameInput }" placeholder="Enter the guild's name here" v-model="guildName" v-on:keyup.enter="() => navigateToLeaderboard(undefined)" />
			<button :key="s.domain" :style="{ backgroundColor: s.colour }" @click="() => navigateToLeaderboard(s.domain)" v-for="s of supportedServers">
				Look it up in {{ s.name }}
			</button>
			<SeparatorLine>OR</SeparatorLine>
			<button :style="{ backgroundColor: 'var(--colour-green)' }" @click="navigateToCustomLeaderboard" class="wide-button">
				Create a leaderboard from scratch
			</button>
		</ContentCard>
		<FooterCard />
	</div>
</template>

<script lang="ts" setup>
	import { ContentCard, FooterCard, HeaderCard, SeparatorLine } from "@/components"
	import { ref } from "vue"
	import { RegionEnum, siteName, supportedServers } from "@/data"
	import { useHead } from "@vueuse/head"
	import { useIsMobile, useNavigation } from "@/hooks"
	import { useMainStore } from "@/stores"

	const { navigateToCustomLeaderboard, navigateToGuildLeaderboard } = useNavigation()
	const isMobile = useIsMobile()
	const store = useMainStore()
	useHead({ title: siteName })

	const guildName = ref("")
	const shouldHightlightNameInput = ref(false)

	if (store.lastGuild.name) {
		guildName.value = store.lastGuild.name
	}

	function navigateToLeaderboard(region?: RegionEnum) {
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

		navigateToGuildLeaderboard(region, guildName.value)
	}
</script>

<style lang="scss" scoped>
	#home-page {
		align-items: center;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		justify-content: center;
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
		outline: 1px solid var(--colour-red);
	}
</style>
