<template>
	<div id="home-page" :class="{ 'mobile-layout': $store.state.mobile }">
		<header-card />

		<content-card>
			<formatted-input :class="{ highlighted: shouldHightlightNameInput }" placeholder="Enter the guild's name here" v-model="guildName" />
			<button class="eu-colour" @click="() => navigateToLeaderboard('EU')">Look it up in Europe</button>
			<button class="na-colour" @click="() => navigateToLeaderboard('NA')">Look it up in North America</button>
			<div class="separator">OR</div>
			<button class="custom-colour wide-button" @click="() => navigateToCustomLeaderboard()">Create a leaderboard from scratch</button>
		</content-card>

		<footer-card />
	</div>
</template>

<script setup>
	import { ref } from "vue"
	import { useRouter } from "vue-router"

	import ContentCard from "@/components/ContentCard.vue"
	import FooterCard from "@/components/FooterCard.vue"
	import FormattedInput from "@/components/FormattedInput.vue"
	import HeaderCard from "@/components/HeaderCard.vue"

	const router = useRouter()

	const guildName = ref("")
	const shouldHightlightNameInput = ref(false)

	function navigateToCustomLeaderboard() {
		router.push({
			name: "customLeaderboard",
			params: {
				discipline: "level",
			}
		})
	}

	function navigateToLeaderboard(region) {
		if (guildName.value.length < 3) {
			shouldHightlightNameInput.value = true
			return
		}

		router.push({
			name: "leaderboard",
			params: {
				region,
				guildName: guildName.value,
				discipline: "level",
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

	button {
		color: var(--colour-white);
	}

	input.highlighted {
		box-shadow: 0 0 0.5em var(--colour-red) !important;
	}

	.separator {
		--or-margin: 2em;

		background-color: var(--colour-white);
		font-size: 0.8em;
		font-weight: bold;
		grid-column: 1/3;
		margin: 1rem 0;
		opacity: 0.5;
		text-align: center;
		user-select: none;

		&::before, &::after {
			content: "";
			display: block;

			background-color: var(--colour-black);
			height: 1px;
			width: calc(50% - var(--or-margin));
		}

		&::before {
			transform: translate(0, 0.6em);
		}

		&::after {
			margin-left: calc(50% + var(--or-margin));
			transform: translate(0, -0.6em);
		}
	}
</style>
