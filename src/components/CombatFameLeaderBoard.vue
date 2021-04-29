<template>
	<div class="leader-board">
		<LeaderBoardLine familyName="Family Name" score="Combat Fame" :header="true" />
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
	import { sortByAttribute, assignPlaces, PRIVATE_LEVEL } from '../helpers'

	function Participant(familyName, combatFame) {
		this.familyName = familyName
		this.combatFame = combatFame
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
						if (member.privacy & PRIVATE_LEVEL) {
							return new Participant(member.familyName, 'Private')
						} else {
							let combatFame = member.characters
								.reduce((fame, character) => {
									if (character.level < 56) {
										return fame + character.level
									} else if (character.level < 60) {
										return fame + character.level * 2
									} else {
										return fame + character.level * 5
									}
								}, 1)

							return new Participant(member.familyName, combatFame)
						}
					})
					.sort(sortByAttribute('combatFame'))
					.map(assignPlaces('combatFame'))
			}
		}
	}
</script>
