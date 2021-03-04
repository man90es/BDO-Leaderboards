<template>
	<div class="leader-board">
		<LeaderBoardLine :familyName="'Family Name'" :characterName="'Character Name'" :score="'Rank'" />
		<LeaderBoardLine v-for="(participant, i) in participants" :hidePlace="isEqualScore(i, i - 1)" :place="getPlace(participant)" :key="participant.familyName" :familyName="participant.familyName" :characterName="namePlusClass(participant)" :score="participant.character.specLevel" />
	</div>
</template>

<script>
	import LeaderBoardLine from './LeaderBoardLine.vue'

	export default {
		name: 'SpecLeaderBoard',
		props: ['guildName', 'specName'],
		components: { LeaderBoardLine },
		methods: {
			isPublic(member) {
				return member.characters[0].specLevels !== undefined
			},

			getNumericSpec(specText) {
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
			},

			isEqualScore(indexA, indexB) {
				let participantA = this.participants[indexA]
				let participantB = this.participants[indexB]

				return participantA && participantB && participantA.character.specLevel === participantB.character.specLevel
			},

			getPlace(participant) {
				return this.places.indexOf(participant.character.specLevel) + 1
			},

			namePlusClass(participant) {
				return `${participant.character.name} (${participant.character.class})`
			}
		},
		computed: {
			places() {
				return this.$store.getters.members(this.guildName)
					.filter(this.isPublic)
					.map((member) => {
						return member.characters.sort((a, b) => {
							return this.getNumericSpec(a.specLevels[this.specName]) > this.getNumericSpec(b.specLevels[this.specName]) ? -1 : 1
						})[0].specLevels[this.specName]
					})
					.filter((value, index, self) => self.indexOf(value) === index)
					.sort((a, b) => {
						return this.getNumericSpec(a) > this.getNumericSpec(b) ? -1 : 1
					})
			},

			participants() {
				return this.$store.getters.members(this.guildName)
					.filter(this.isPublic)
					.map((member) => {
						member.character = member.characters.sort((a, b) => {
							return this.getNumericSpec(a.specLevels[this.specName]) > this.getNumericSpec(b.specLevels[this.specName]) ? -1 : 1
						})[0]

						member.character.specLevel = member.character.specLevels[this.specName]
						member.character.numericSpecLevel = this.getNumericSpec(member.character.specLevel)

						return member
					})
					.sort((a, b) => {
						return a.character.numericSpecLevel > b.character.numericSpecLevel ? -1 : 1
					})
			}
		}
	}
</script>
