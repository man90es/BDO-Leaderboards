<template>
	<div class="leader-board">
		<LeaderBoardLine :familyName="'Family Name'" :characterName="'Character Name'" :score="'Level'" />
		<LeaderBoardLine v-for="(participant, i) in participants" :hidePlace="isEqualScore(i, i - 1)" :place="getPlace(participant)" :key="participant.familyName" :familyName="participant.familyName" :characterName="namePlusClass(participant)" :score="participant.character.level" />
	</div>
</template>

<script>
	import LeaderBoardLine from './LeaderBoardLine.vue'

	export default {
		name: 'LevelLeaderBoard',
		props: ['guildName'],
		components: { LeaderBoardLine },
		methods: {
			isEqualScore(indexA, indexB) {
				let participantA = this.participants[indexA]
				let participantB = this.participants[indexB]

				return participantA && participantB && participantA.character.level === participantB.character.level
			},

			getPlace(participant) {
				return this.places.indexOf(participant.character.level) + 1
			},

			namePlusClass(participant) {
				return `${participant.character.name} (${participant.character.class})`
			}
		},
		computed: {
			places() {
				return this.$store.getters.members(this.guildName)
					.map((member) => {
						return member.characters.sort((a, b) => {
							return a.level > b.level ? -1 : 1
						})[0].level
					})
					.filter((value, index, self) => self.indexOf(value) === index)
					.sort((a, b) => a > b ? -1 : 1)
			},

			participants() {
				let p = this.$store.getters.members(this.guildName)
					.map((member) => {
						member.character = member.characters.sort((a, b) => {
							return a.level > b.level ? -1 : 1
						})[0]

						return member
					})
					.sort((a, b) => {
						return a.character.level > b.character.level ? -1 : 1
					})

				return p
			}
		}
	}
</script>
