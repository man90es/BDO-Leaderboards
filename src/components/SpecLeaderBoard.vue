<template>
	<div class="leader-board">
		<LeaderBoardLine :familyName="'Family Name'" :characterName="'Character Name'" :score="'Rank'" />
		<LeaderBoardLine v-for="p in participants" :key="p.familyName"
			:hidePlace="p.groupWPrev"
			:place="p.place"
			:colour="p.colour"
			:familyName="p.familyName"
			:characterName="`${p.name} (${p.class})`"
			:score="p.specLevel"
		/>
	</div>
</template>

<script>
	import LeaderBoardLine from './LeaderBoardLine.vue'

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

	function getNumericSpec(specText) {
		let offset = {
			"Beginner": 0,
			"Apprentice": 10,
			"Skilled": 20,
			"Professional": 30,
			"Artisan": 40,
			"Master": 50,
			"Guru": 80
		}[specText.split(' ')[0]]

		return offset + parseInt(specText.split(' ')[1])
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
							.sort((repA, repB) => { // Choose member's rep with the highest spec level
								return repA.numericSpecLevel > repB.numericSpecLevel ? -1 : 1
							})[0]

						return new Participant(member.familyName, memberRep.name, memberRep.class, memberRep.specLevel, memberRep.numericSpecLevel)
					})
					.sort((participantA, participantB) => { // Order by spec level
						return participantA.numericSpecLevel > participantB.numericSpecLevel ? -1 : 1
					})
					.map((participant, index, self) => { // Assign places
						let prev = self[index - 1]

						if (prev === undefined) {
							participant.place = 1
							participant.colour = 1
						} else {
							participant.place = prev.place + 1

							if (prev.numericSpecLevel === participant.numericSpecLevel) {
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
