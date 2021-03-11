<template>
	<form class="home-page" :class="{ 'mobile-layout': $store.state.mobile }">
		<header>
			<h1>
				BDO Guild Leader Board
			</h1>
			<span>Select your region, type in the guild name and press the magic button.</span>
		</header>

		<div class="radio-box">
			<input type="radio" value="EU" id="region-EU" v-model="region">
			<label for="region-EU">EU</label>
			<input type="radio" value="NA" id="region-NA" v-model="region">
			<label for="region-NA">NA</label>
		</div>

		<input type="text" placeholder="Guild name" v-model="guildName">

		<button @click="navigateToLeaderBoard">↩</button>

		<footer>
			<span>deadMNGO#8312</span>
			<a href="https://gitlab.com/man90/bdo-guild-leader-board" target="_blank">Source</a>
			<a href="https://gitlab.com/man90/black-desert-social-rest-api" target="_blank">API</a>
		</footer>
	</form>
</template>

<script>
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
				this.guildName = (newValue.charAt(0).toUpperCase() + newValue.slice(1)).replace(' ', '')
			},
		},
		created() {
			document.title = "BDO Guild Leader Board"
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
		background-color: #aaf2;
		color: #fff;
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
		border-bottom: 0.1em solid transparent
	}

	.radio-box input:checked + label {
		border-color: #bbc
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
