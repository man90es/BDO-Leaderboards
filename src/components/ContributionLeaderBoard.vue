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
					.sort((participantA, participantB) => { // Order by contribution points
						return participantA.CP > participantB.CP ? -1 : 1
					})
					.map((participant, index, self) => { // Assign places
						let prev = self[index - 1]

						if (prev === undefined) {
							participant.place = 1
							participant.colour = 1
						} else {
							participant.place = prev.place + 1

							if (prev.CP === participant.CP) {
								participant.groupWPrev = true
								participant.colour = prev.colour
							} else {
								participant.colour = prev.colour + 1
							}
						}

						return participant
					})
			}
		}
	}
</script>
