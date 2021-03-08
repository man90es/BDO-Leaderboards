<template>
	<div class="leader-board">
		<LeaderBoardLine :familyName="'Family Name'" :score="'CP'" />
		<LeaderBoardLine v-for="p in participants" :key="p.familyName"
			:hidePlace="p.groupWPrev"
			:place="p.place"
			:colour="p.colour"
			:familyName="p.familyName"
			:score="p.CP"
		/>
	</div>
</template>

<script>
	import LeaderBoardLine from './LeaderBoardLine.vue'
	import { sortByAttribute, assignPlaces } from '../helpers'

	function Participant(familyName, contributionPoints) {
		this.familyName = familyName
		this.CP = contributionPoints
		this.place = 1
		this.colour = 0
		this.groupWPrev = false
	}

	export default {
		name: 'ContributionLeaderBoard',
		props: ['guildName'],
		components: { LeaderBoardLine },
		computed: {
			participants() {
				return this.$store.getters.members(this.guildName)
					.filter((member) => { // Filter out members with private CP
						return member.contributionPoints !== undefined
					})
					.map((member) => { // Convert members to participants
						return new Participant(member.familyName, member.contributionPoints)
					})
					.sort(sortByAttribute('CP'))
					.map(assignPlaces('CP'))
			}
		}
	}
</script>
