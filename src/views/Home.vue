<template>
	<form class="home-page" :class="{ 'mobile-layout': $store.state.mobile }">
		<header>
			<h1 data-nosnippet>
				BDO Leaderboards
			</h1>
			<span>Search for Black Desert Online leaderboards.</span>
		</header>

		<div class="radio-box" data-nosnippet>
			<input type="radio" value="EU" id="region-EU" v-model="region">
			<label for="region-EU">EU</label>
			<input type="radio" value="NA" id="region-NA" v-model="region">
			<label for="region-NA">NA</label>
		</div>

		<input type="text" placeholder="Guild name" v-model="guildName">

		<button @click="navigateToLeaderBoard" data-nosnippet>↩</button>

		<footer data-nosnippet>
			<span>Made by deadMNGO#8312</span>
			<a href="https://gitlab.com/man90/bdo-leader-boards" target="_blank">Source</a>
			<a href="https://gitlab.com/man90/black-desert-social-rest-api" target="_blank">API</a>
		</footer>
	</form>
</template>

<script>
	import { capitalise } from '../helpers'

	export default {
		name: 'Home',
		data() {
			return {
				region: "EU",
				guildName: ""
			}
		},
		methods: {
			navigateToLeaderBoard() {
				this.$router.push({ name: 'LeaderBoard', params: { region: this.region, guildName: this.guildName, discipline: 'level' } })
			}
		},
		watch: {
			guildName: function(newValue) {
				// Capitalise guild name and remove spaces, as it is done in the game
				if (newValue.length > 0) {
					this.guildName = capitalise(newValue).replace(' ', '')
				}
			},
		},
		created() {
			document.title = "BDO Leaderboards"
		}
	}
</script>

<style scoped>
	.home-page {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 2rem;
		height: 100vh;
	}

	.home-page.mobile-layout {
		flex-direction: column;
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
		gap: 1em;
	}

	label, button {
		cursor: pointer;
	}

	button {
		background-color: #fff;
		font-size: 1.5em;
		display: flex;
		align-items: center;
	}

	button:active {
		background-color: #aaf1;
	}

	.radio-box input {
		display: none;
	}

	label {
		border-bottom: 0.1em solid transparent;
		color: #fff;
	}

	.radio-box input:checked + label {
		border-color: #fff
	}

	header {
		position: fixed;
		top: 0;
		text-align: center;
		margin: 0 1em;
	}

	header span {
		opacity: 0.7;
	}

	footer {
		position: fixed;
		bottom: 0;
		width: 100vw;
		display: flex;
		justify-content: flex-end;
		padding: 2em;
		gap: 1em;
	}

	footer a {
		color: #bbc;
		text-decoration: none;
		border-bottom: 1px solid #bbc;
	}

	.mobile-layout footer {
		font-size: 0.75em;
	}
</style>
