<template>
	<div class="leader-board">
		<LeaderBoardLine :familyName="'Family Name'" :score="'CP'" />
		<LeaderBoardLine v-for="p in participants" :key="p.familyName"
			:hidePlace="p.groupWPrev"
			:place="p.place"
			:familyName="p.familyName"
			:score="p.CP"
		/>
	</div>
</template>

<script>
	import LeaderBoardLine from './LeaderBoardLine.vue'

	function Participant(familyName, contributionPoints) {
		this.familyName = familyName
		this.CP = contributionPoints
		this.place = 1
		this.groupWPrev = false
	}

	export default {
		name: 'ContributionLeaderBoard',
		props: ['guildName'],
		components: { LeaderBoardLine },
		computed: {
			participants() {
				return this.$store.getters.members(this.guildName)
					.map((member) => { // Convert members to participants
						return new Participant(member.familyName, member.contributionPoints)
					})
					.sort((participantA, participantB) => { // Order by contribution points
						return participantA.CP > participantB.CP ? -1 : 1
					})
					.map((participant, index, self) => { // Assign places
						let prev = self[index - 1]

						if (prev === undefined) {
							participant.place = 1
						} else if (prev.CP === participant.CP) {
							participant.place = prev.place
							participant.groupWPrev = true
						} else {
							participant.place = prev.place + 1
						}

						return participant
					})
			}
		}
	}
</script>
