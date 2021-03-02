<template>
	<div class="leader-board">
		<LeaderBoardLine :familyName="'Family Name'" :score="'CP'" />
		<LeaderBoardLine v-for="(participant, index) in participants" :place="index + 1" :key="participant.familyName" :familyName="participant.familyName" :score="participant.contributionPoints" />
	</div>
</template>

<script>
	import LeaderBoardLine from './LeaderBoardLine.vue'

	export default {
		name: 'ContributionLeaderBoard',
		props: ['guildName'],
		components: { LeaderBoardLine },
		computed: {
			participants() {
				return this.$store.getters.members(this.guildName).sort((a, b) => {
					return a.contributionPoints > b.contributionPoints ? -1 : 1
				})
			}
		}
	}
</script>
