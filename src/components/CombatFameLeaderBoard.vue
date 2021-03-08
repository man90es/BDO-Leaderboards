<template>
	<div class="leader-board">
		<LeaderBoardLine :familyName="'Family Name'" :score="'Combat Fame'" />
		<LeaderBoardLine v-for="p in participants" :key="p.familyName"
			:hidePlace="p.groupWPrev"
			:place="p.place"
			:colour="p.colour"
			:familyName="p.familyName"
			:score="p.combatFame"
		/>
	</div>
</template>

<script>
	import LeaderBoardLine from './LeaderBoardLine.vue'
	import { sortByAttribute, assignPlaces } from '../helpers'

	function Participant(familyName, combatFame) {
		this.familyName = familyName
		this.combatFame = combatFame
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
					.filter((member) => { // Filter out members with private levels
						return member.characters[0].level !== undefined
					})
					.map((member) => { // Convert members to participants
						let combatFame = member.characters
							.reduce((fame, character) => {
								// https://www.blackdesertfoundry.com/family-fame-guide

								if (character.level < 15) {
									return fame
								} else if (character.level < 56) {
									return fame + character.level
								} else if (character.level < 60) {
									return fame + character.level * 2
								} else {
									return fame + character.level * 5
								}
							}, 1)

						return new Participant(member.familyName, combatFame)
					})
					.sort(sortByAttribute('combatFame'))
					.map(assignPlaces('combatFame'))
			}
		}
	}
</script>
