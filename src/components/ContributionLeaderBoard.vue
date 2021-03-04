<template>
	<div class="leader-board">
		<LeaderBoardLine :familyName="'Family Name'" :score="'CP'" />
		<LeaderBoardLine v-for="(participant, i) in participants" :hidePlace="isEqualScore(i, i - 1)" :place="getPlace(participant)" :key="participant.familyName" :familyName="participant.familyName" :score="participant.contributionPoints" />
	</div>
</template>

<script>
	import LeaderBoardLine from './LeaderBoardLine.vue'

	export default {
		name: 'ContributionLeaderBoard',
		props: ['guildName'],
		components: { LeaderBoardLine },
		methods: {
			isEqualScore(indexA, indexB) {
				let participantA = this.participants[indexA]
				let participantB = this.participants[indexB]

				return participantA && participantB && participantA.contributionPoints === participantB.contributionPoints
			},

			getPlace(participant) {
				return this.places.indexOf(participant.contributionPoints) + 1
			}
		},
		computed: {
			places() {
				return this.$store.getters.members(this.guildName)
					.map((member) => member.contributionPoints)
					.filter((value, index, self) => self.indexOf(value) === index)
					.sort((a, b) => a > b ? -1 : 1)
			},

			participants() {
				return this.$store.getters.members(this.guildName).sort((a, b) => {
					return a.contributionPoints > b.contributionPoints ? -1 : 1
				})
			}
		}
	}
</script>
