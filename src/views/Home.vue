<template>
	<form class="home-page" :class="{ 'mobile-layout': $store.state.mobile }">
		<div class="radio-box">
			<input type="radio" value="EU" id="region-EU" v-model="region">
			<label for="region-EU">EU</label>
			<input type="radio" value="NA" id="region-NA" v-model="region">
			<label for="region-NA">NA</label>
		</div>

		<input type="text" placeholder="Guild name" v-model="guildName">

		<button @click="navigateToLeaderBoard">↩</button>
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
		font-size: 2em;
	}

	button:active {
		background-color: #aaf1;
	}

	.radio-box input {
		display: none;
	}

	.radio-box input:checked + label {
		border-bottom: 0.1em solid #ccc
	}
</style>
