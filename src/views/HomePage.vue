<template>
	<main :class="{ 'mobile-layout': isMobile }">
		<HeaderCard />
		<ContentCard>
			<input autocapitalize="on" :class="{ highlighted: shouldHightlightNameInput }" placeholder="Enter the guild name" v-model="guildName" />
			<button :key="s.domain" :style="{ backgroundColor: s.colour }" @click="() => navigateToLeaderboard(s.domain)" v-for="s of supportedServers">
				Look it up in {{ s.name }}
			</button>
			<SeparatorLine>OR</SeparatorLine>
			<button @click="navigateToCustomLeaderboard" :class="$style.wideButton" :style="{ backgroundColor: 'var(--colour-green)' }">
				{{ store.customList.length > 0 ? "Open" : "Create a" }} custom leaderboard
			</button>
		</ContentCard>
		<ContentCard v-if="store.history.length > 0">
			<button :class="$style.wideButton" :key="h.ts" @click="() => navigateToLeaderboard(h.region, h.name)" v-for=" h of store.history">
				{{ h.region }}
				<span :class="$style.guildName">{{ h.name }}</span>
				({{ formatDistanceToNow(h.ts) }} ago)
			</button>
		</ContentCard>
		<FooterCard />
	</main>
</template>

<script lang="ts" setup>
	import { ContentCard, FooterCard, HeaderCard, SeparatorLine } from "@/components"
	import { formatDistanceToNow } from "date-fns"
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

	function navigateToLeaderboard(region: RegionEnum, name?: string) {
		name ??= guildName.value

		// If guild name input is empty, highlight it and exit
		if (name.length < 1) {
			shouldHightlightNameInput.value = true
			return
		}

		store.addGuildToHistory(region, name)
		navigateToGuildLeaderboard(region, name)
	}
</script>

<style scoped>
	main {
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
	}

	input {
		grid-column: 1/3;
		margin: 0;
		text-align: center;
		text-transform: capitalize;

		&.highlighted {
			box-shadow: 0 0 0.5em var(--colour-red) !important;
			outline: 1px solid var(--colour-red);
		}
	}

	input::placeholder {
		text-transform: none !important;
	}
</style>

<style scoped module>
	.wideButton {
		background-color: var(--colour-teal);
		grid-column: 1/3;
	}

	.guildName {
		text-transform: capitalize;
	}
</style>
