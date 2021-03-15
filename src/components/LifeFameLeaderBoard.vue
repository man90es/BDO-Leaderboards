<template>
	<div class="leader-board">
		<LeaderBoardLine :familyName="'Family Name'" :score="'Life Fame'" />
		<LeaderBoardLine v-for="p in participants" :key="p.familyName"
			:hidePlace="p.groupWPrev"
			:place="p.place"
			:colour="p.colour"
			:familyName="p.familyName"
			:score="p.lifeFame"
		/>
	</div>
</template>

<script>
	import LeaderBoardLine from './LeaderBoardLine.vue'
	import { getNumericSpec, sortByAttribute, assignPlaces, PRIVATE_SPECS } from '../helpers'

	function Participant(familyName, lifeFame) {
		this.familyName = familyName
		this.lifeFame = lifeFame
		this.place = 1
		this.colour = 0
		this.groupWPrev = false
	}

	export default {
		name: 'ContributionLeaderBoard',
		components: { LeaderBoardLine },
		computed: {
			participants() {
				return this.$store.getters.members(this.$route.params.guildName)
					.map((member) => { // Convert members to participants
						if (member.privacy & PRIVATE_SPECS) {
							return new Participant(member.familyName, 'Private')
						} else {
							let lifeFame = member.characters
								.reduce((fame, character) => {
									return fame + Object.values(character.specLevels).reduce((cFame, specLevel) => {
										let numericSpec = getNumericSpec(specLevel)

										return cFame + (numericSpec > 30 ? numericSpec / 2 : 0) + (numericSpec > 80 ? numericSpec : 0)
									}, 0)
								}, 1)

							return new Participant(member.familyName, Math.floor(lifeFame))
						}
					})
					.sort(sortByAttribute('lifeFame'))
					.map(assignPlaces('lifeFame'))
			}
		}
	}
</script>
