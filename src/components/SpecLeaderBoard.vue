<template>
	<div class="leader-board">
		<LeaderBoardLine :familyName="'Family Name'" :characterName="'Character Name'" :score="'Rank'" />
		<LeaderBoardLine v-for="p in participants" :key="p.familyName"
			:hidePlace="p.groupWPrev"
			:place="p.place"
			:colour="p.colour"
			:familyName="p.familyName"
			:characterClass="p.class"
			:characterName="p.name"
			:score="p.specLevel"
		/>
	</div>
</template>

<script>
	import LeaderBoardLine from './LeaderBoardLine.vue'
	import { getNumericSpec, sortByAttribute, assignPlaces } from '../helpers'

	function Participant(familyName, characterName, characterClass, specLevel, numericSpecLevel) {
		this.familyName = familyName
		this.name = characterName
		this.class = characterClass
		this.specLevel = specLevel
		this.numericSpecLevel = numericSpecLevel
		this.place = 1
		this.colour = 0
		this.groupWPrev = false
	}

	export default {
		name: 'SpecLeaderBoard',
		props: ['guildName', 'specName'],
		components: { LeaderBoardLine },
		computed: {
			participants() {
				return this.$store.getters.members(this.guildName)
					.filter((member) => { // Filter out members with private spec levels
						return member.characters[0].specLevels !== undefined
					})
					.map((member) => { // Convert members to participants
						let memberRep = member.characters
							.map((character) => { // Convert characters to reps
								return {
									name: character.name,
									class: character.class,
									specLevel: character.specLevels[this.specName],
									numericSpecLevel: getNumericSpec(character.specLevels[this.specName])
								}
							})
							.sort(sortByAttribute('numericSpecLevel'))[0] // Choose member's rep with the highest spec level

						return new Participant(member.familyName, memberRep.name, memberRep.class, memberRep.specLevel, memberRep.numericSpecLevel)
					})
					.sort(sortByAttribute('numericSpecLevel'))
					.map(assignPlaces('numericSpecLevel'))
			}
		}
	}
</script>
