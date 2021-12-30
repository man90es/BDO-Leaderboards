<template>
	<div id="home-page" :class="{ 'mobile-layout': $store.state.mobile }" :style="{ backgroundImage: assets.bg }">
		<div class="card" id="header-card">
			<h1>BDO Leaderboards</h1>
			<span>We have Black Desert Online leaderboards for your guild!</span>
		</div>

		<div class="card">
			<FormattedInput :class="{ highlighted: shouldHightlightNameInput }" placeholder="Enter the guild's name here" v-model="guildName" />
			<button class="eu-colour" @click="() => navigateToLeaderboard('EU')">Look it up in Europe</button>
			<button class="na-colour" @click="() => navigateToLeaderboard('NA')">Look it up in North America</button>
			<div class="separator">OR</div>
			<button class="custom-colour wide-button" @click="() => navigateToCustomLeaderboard()">Create a leaderboard from scratch</button>
		</div>

		<div class="card" id="footer-card">
			<a href="https://github.com/octoman90/BDO-Leaderboards" target="_blank" :style="{ backgroundImage: assets.star }">Give me a star on GitHub!</a>
			<a href="https://github.com/octoman90/BDO-REST-API" target="_blank" :style="{ backgroundImage: assets.construction }">Curious about the API?</a>
			<a href="https://github.com/octoman90/BDO-Leaderboards/issues" target="_blank" :style="{ backgroundImage: assets.bug }">Found a bug?</a>
		</div>
	</div>
</template>

<script setup>
	import { ref } from "vue"
	import { useRouter } from "vue-router"

	import FormattedInput from "../components/FormattedInput.vue"

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

	const assets = {
		bg: `url(${process.env.BASE_URL}assets/bg.png)`,
		star: `url(${process.env.BASE_URL}assets/star_black_24dp.svg)`,
		construction: `url(${process.env.BASE_URL}assets/construction_black_24dp.svg)`,
		bug: `url(${process.env.BASE_URL}assets/bug_report_black_24dp.svg)`,
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

			div.card {
				width: calc(100vw - 1em);
			}
		}

		&:not(.mobile-layout) {
			div.card {
				min-width: 25em;
			}
		}
	}

	div.card {
		padding: 2em;
		background-color: var(--colour-white);
		color: var(--colour-black);
		display: grid;
		grid-template-columns: 1fr 1fr;
		width: 25vw;
		max-width: 100vw;
		gap: 0.5em;
		box-shadow: 0 0 1em var(--colour-black);
		border-radius: 0.1em;

		h1 {
			margin: 0;
			color: var(--colour-black); // This overwrites styles from LeaderBoard.vue
		}

		input {
			grid-column: 1/3;
			text-align: center;
			margin: 0;
		}

		input, button {
			padding: 0.5em;
			border-radius: 0.1em;
			box-shadow: 0 0 0.25em var(--colour-grey);
			font-size: 0.9em;
		}

		.wide-button {
			grid-column: 1/3;
		}

		&#header-card {
			display: flex;
			flex-direction: column;
			align-items: center;

			span {
				text-align: center;
				opacity: 0.8;
			}
		}

		&#footer-card {
			a {
				color: var(--colour-black);
				text-decoration: none;
				opacity: 0.5;
				padding-left: 1.25em;
				background-repeat: no-repeat;
				background-size: contain;
				grid-column: 1/3;
				font-size: 0.9em;

				&:hover {
					opacity: 0.8;
				}
			}
		}
	}

	.eu-colour {
		background-color: var(--colour-blue);
	}

	.na-colour {
		background-color: var(--colour-red);
	}

	.custom-colour {
		background-color: var(--colour-green);
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
