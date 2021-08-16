<template>
	<header>
		<h1>BDO Leaderboards</h1>
		<span>Search for Black Desert Online leaderboards.</span>
	</header>

	<form class="home-page-form" :class="{ 'mobile-layout': $store.state.mobile }">
		<div class="radio-box" data-nosnippet>
			<input type="radio" value="EU" id="region-EU" v-model="region">
			<label for="region-EU">EU</label>
			<input type="radio" value="NA" id="region-NA" v-model="region">
			<label for="region-NA">NA</label>
		</div>

		<input type="text" placeholder="Guild name" v-model="guildName">

		<button @click="navigateToLeaderBoard" data-nosnippet>↩</button>
	</form>

	<router-link to="/custom/level" id="custom-leaderboard-link">Custom leaderboard<span>New!</span></router-link>

	<footer data-nosnippet>
		<a href="https://github.com/octoman90/BDO-Leaderboards/issues" target="_blank">Contact</a>
		<a href="https://github.com/octoman90/BDO-Leaderboards" target="_blank">GitHub</a>
		<a href="https://github.com/octoman90/BDO-REST-API" target="_blank">API</a>
	</footer>
</template>

<script>
	import { capitalise } from "../core/utils"

	export default {
		name: "Home",
		data() {
			return {
				region: "EU",
				guildName: "",
			}
		},
		methods: {
			navigateToLeaderBoard() {
				this.$router.push({ name: "leaderboard", params: { region: this.region, guildName: this.guildName, discipline: "level" } })
			}
		},
		watch: {
			guildName: function(newValue) {
				// Capitalise guild name and remove spaces, as it is done in the game
				if (newValue.length > 0) {
					this.guildName = capitalise(newValue).replace(" ", "")
				}
			},
		},
		created() {
			document.title = "BDO Leaderboards"
		}
	}
</script>

<style lang="scss">
	#app {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		min-height: 100vh;
		gap: 1em;
	}

	.home-page-form {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 2rem;

		&.mobile-layout {
			flex-direction: column;
		}

		button {
			background-color: #fff;
			font-size: 1.5em;
			display: flex;
			align-items: center;

			&:active {
				background-color: #aaf1;
			}
		}
	}

	select, input, button {
		font-size: 1.25rem;
		padding: 1rem;
		border-radius: 0.5rem;
		border: 0;
		height: 3rem;
	}

	.radio-box {
		font-size: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1em;
	}

	label, button {
		cursor: pointer;
	}

	#custom-leaderboard-link {
		color: inherit;
		font-size: 1.2em;
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}

		span {
			margin-left: 0.5em;
			color: red;
			vertical-align: super;
			font-size: 0.8em;
		}
	}

	.radio-box input {
		display: none;

		&:checked + label {
			border-color: #fff
		}
	}

	label {
		border-bottom: 0.1em solid transparent;
		color: #fff;
	}

	header, footer {
		position: fixed;
	}

	header {
		top: 0;
		text-align: center;
		margin: 0 1em;

		span {
			opacity: 0.7;
		}
	}

	footer {
		bottom: 0;
		width: 100vw;
		display: flex;
		justify-content: flex-end;
		padding: 2em;
		gap: 1em;

		a {
			color: #bbc;
			text-decoration: none;
			border-bottom: 1px solid #bbc;
		}
	}

	.mobile-layout footer {
		font-size: 0.75em;
	}
</style>
