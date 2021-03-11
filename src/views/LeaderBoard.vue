<template>
	<div class="leader-board-page" :class="{ 'mobile-layout': $store.state.mobile }">
		<h1>{{$route.params.guildName}}</h1>
		<router-link to="../../" class="select-guild">Go back to guild selection</router-link>
		<ul>
			<li><router-link to="./level">Character Level</router-link></li>
			<li><router-link to="./contribution">Contribution Points</router-link></li>
			<li><router-link to="./gathering">Gathering</router-link></li>
			<li><router-link to="./fishing">Fishing</router-link></li>
			<li><router-link to="./hunting">Hunting</router-link></li>
			<li><router-link to="./cooking">Cooking</router-link></li>
			<li><router-link to="./alchemy">Alchemy</router-link></li>
			<li><router-link to="./processing">Processing</router-link></li>
			<li><router-link to="./training">Training</router-link></li>
			<li><router-link to="./trading">Trading</router-link></li>
			<li><router-link to="./farming">Farming</router-link></li>
			<li><router-link to="./sailing">Sailing</router-link></li>
			<li><router-link to="./barter">Barter</router-link></li>
			<li><router-link to="./combat">Combat Fame</router-link></li>
			<li><router-link to="./life">Life Fame</router-link></li>
		</ul>
		<ContributionLeaderBoard v-if="$route.params.discipline == 'contribution'"/>
		<LevelLeaderBoard v-else-if="$route.params.discipline == 'level'"/>
		<CombatFameLeaderBoard v-else-if="$route.params.discipline == 'combat'"/>
		<LifeFameLeaderBoard v-else-if="$route.params.discipline == 'life'"/>
		<SpecLeaderBoard v-else :specName="$route.params.discipline"/>

		<LoadingBanner v-if="$store.state.loadingStage" />
	</div>
</template>

<script>
	import ContributionLeaderBoard from '../components/ContributionLeaderBoard.vue'
	import LevelLeaderBoard from '../components/LevelLeaderBoard.vue'
	import CombatFameLeaderBoard from '../components/CombatFameLeaderBoard.vue'
	import LifeFameLeaderBoard from '../components/LifeFameLeaderBoard.vue'
	import SpecLeaderBoard from '../components/SpecLeaderBoard.vue'
	import LoadingBanner from '../components/LoadingBanner.vue'

	export default {
		name: 'LeaderBoard',
		components: {
			ContributionLeaderBoard,
			LevelLeaderBoard,
			SpecLeaderBoard,
			CombatFameLeaderBoard,
			LifeFameLeaderBoard,
			LoadingBanner
		},
		created() {
			if (!(this.$route.params.guildName in this.$store.state.guilds)) {
				this.$store.dispatch('requestGuild', {
					guildName: this.$route.params.guildName,
					region: this.$route.params.region
				})

				document.title = `${this.$route.params.guildName} Leader Board`
			}
		}
	}
</script>

<style>
	.leader-board-page {
		display: flex;
		flex-direction: column;
		background-color: #21252b;
		min-height: 100vh;
	}

	.leader-board-page:not(.mobile-layout) {
		align-items: center;
	}

	ul {
		padding-left: 0;
		text-align: center;
		list-style: none;
		width: 100%;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(10em, 1fr));
		grid-gap: 1em;
	}

	ul a {
		color: #fff;
		text-decoration: none;
		padding-bottom: 0.2em;
	}

	h1 {
		text-align: center;
		margin-bottom: 0;
	}

	.router-link-exact-active {
		border-bottom: 0.15em solid #bbc
	}

	.select-guild {
		color: #bbc;
		margin-bottom: 1rem;
		opacity: 0.8;
		text-align: center;
	}
</style>
