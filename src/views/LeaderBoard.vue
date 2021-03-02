<template>
	<div class="leader-board-page">
		<h1>{{$route.params.guildName}}</h1>
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
		</ul>
		<ContributionLeaderBoard v-if="$route.params.discipline == 'contribution'"/>
		<LevelLeaderBoard v-else-if="$route.params.discipline == 'level'"/>
		<SpecLeaderBoard v-else :specName="$route.params.discipline"/>
	</div>
</template>

<script>
	import ContributionLeaderBoard from '@/components/ContributionLeaderBoard.vue'
	import LevelLeaderBoard from '@/components/LevelLeaderBoard.vue'
	import SpecLeaderBoard from '@/components/SpecLeaderBoard.vue'

	export default {
		name: 'LeaderBoard',
		components: { ContributionLeaderBoard, LevelLeaderBoard, SpecLeaderBoard },
		created() {
			this.$store.dispatch('requestGuild', {
				guildName: this.$route.params.guildName,
				region: this.$route.params.region
			})
		}
	}
</script>

<style>
	.leader-board-page {
		display: flex;
		flex-direction: column;
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

	.router-link-exact-active {
		border-bottom: 0.15em solid #ccc
	}
</style>
