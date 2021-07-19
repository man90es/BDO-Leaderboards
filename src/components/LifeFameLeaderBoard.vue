<template>
	<div class="leader-board">
		<LeaderBoardHeaderLine :headers="['#', 'Family Name', null, 'Rank']" />
		<LeaderBoardLine v-for="p in participants" :key="p.profile.familyName" v-bind="p" />
	</div>
</template>

<script>
	import LeaderBoardHeaderLine from './LeaderBoardHeaderLine.vue'
	import LeaderBoardLine from './LeaderBoardLine.vue'
	import { getNumericSpec, sortByScore, assignPlaces, PRIVATE_SPECS } from '../helpers'
	import { Participant } from '../models'

	export default {
		name: 'ContributionLeaderBoard',
		components: {
			LeaderBoardHeaderLine,
			LeaderBoardLine,
		},
		computed: {
			participants() {
				return this.$store.getters.members(this.$route.params.guildName)
					.map((member) => { // Convert members to participants
						if (member.privacy & PRIVATE_SPECS) {
							return new Participant(member, null, -1, 'Private')
						} else {
							let lifeFame = member.characters
								.reduce((fame, character) => {
									return fame + Object.values(character.specLevels).reduce((cFame, specLevel) => {
										let numericSpec = getNumericSpec(specLevel)

										return cFame + (numericSpec > 30 ? numericSpec / 2 : 0) + (numericSpec > 80 ? numericSpec : 0)
									}, 0)
								}, 1)

							return new Participant(member, null, Math.floor(lifeFame))
						}
					})
					.sort(sortByScore)
					.map(assignPlaces)
			}
		}
	}
</script>
