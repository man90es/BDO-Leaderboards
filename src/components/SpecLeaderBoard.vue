<template>
	<div class="leader-board">
		<LeaderBoardHeaderLine :headers="['#', 'Family Name', 'Character', 'Rank']" />
		<LeaderBoardLine v-for="p in participants" :key="p.profile.familyName" v-bind="p" />
	</div>
</template>

<script>
	import LeaderBoardHeaderLine from './LeaderBoardHeaderLine.vue'
	import LeaderBoardLine from './LeaderBoardLine.vue'
	import { getNumericSpec, sortByScore, assignPlaces, PRIVATE_SPECS } from '../helpers'
	import { Participant } from '../models'

	export default {
		name: 'SpecLeaderBoard',
		props: ['specName'],
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
							let memberRep = member.characters
								.map((character) => { // Convert characters to reps
									return {
										name: character.name,
										class: character.class,
										specLevel: character.specLevels[this.specName],
										numericSpecLevel: getNumericSpec(character.specLevels[this.specName])
									}
								})
								.sort((a, b) => { // Choose member's rep with the highest spec level
									return a.numericSpecLevel > b.numericSpecLevel ? -1 : 1
								})[0]

							return new Participant(member, memberRep, memberRep.numericSpecLevel, memberRep.specLevel)
						}
					})
					.sort(sortByScore)
					.map(assignPlaces)
			}
		}
	}
</script>
