<template>
	<div class="leader-board">
		<LeaderBoardLine :familyName="'Family Name'" :characterName="'Character Name'" :score="'Level'" />
		<LeaderBoardLine v-for="p in participants" :key="p.familyName"
			:hidePlace="p.groupWPrev"
			:place="p.place"
			:colour="p.colour"
			:familyName="p.familyName"
			:characterName="`${p.name} (${p.class})`"
			:score="p.level"
		/>
	</div>
</template>

<script>
	import LeaderBoardLine from './LeaderBoardLine.vue'

	function Participant(familyName, characterName, characterClass, characterLevel) {
		this.familyName = familyName
		this.name = characterName
		this.class = characterClass
		this.level = characterLevel
		this.place = 1
		this.colour = 0
		this.groupWPrev = false
	}

	export default {
		name: 'LevelLeaderBoard',
		props: ['guildName'],
		components: { LeaderBoardLine },
		computed: {
			participants() {
				return this.$store.getters.members(this.guildName)
					.filter((member) => { // Filter out members with private levels
						return member.characters[0].level !== undefined
					})
					.map((member) => { // Convert members to participants
						let memberRep = member.characters
							.sort((characterA, characterB) => { // Choose member's character with the highest level
								return characterA.level > characterB.level ? -1 : 1
							})[0]

						return new Participant(member.familyName, memberRep.name, memberRep.class, memberRep.level)
					})
					.sort((participantA, participantB) => { // Order by character level
						return participantA.level > participantB.level ? -1 : 1
					})
					.map((participant, index, self) => { // Assign places
						let prev = self[index - 1]

						if (prev === undefined) {
							participant.place = 1
							participant.colour = 1
						} else {
							participant.place = prev.place + 1

							if (prev.level === participant.level) {
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
