<template>
	<div class="leader-board">
		<LeaderBoardLine :familyName="'Family Name'" :characterName="'Character Name'" :score="'Rank'" />
		<LeaderBoardLine v-for="(participant, index) in participants" :place="index + 1" :key="participant.familyName" :familyName="participant.familyName" :characterName="`${participant.character.name} (${participant.character.class})`" :score="participant.character.specLevel" />
	</div>
</template>

<script>
	import LeaderBoardLine from './LeaderBoardLine.vue'

	export default {
		name: 'SpecLeaderBoard',
		props: ['guildName', 'specName'],
		components: { LeaderBoardLine },
		methods: {
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
			}
		},
		computed: {
			participants() {
				let p = this.$store.getters.members(this.guildName)
					.filter((member) => member.characters[0].specLevels !== undefined)
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

				return p
			}
		}
	}
</script>
