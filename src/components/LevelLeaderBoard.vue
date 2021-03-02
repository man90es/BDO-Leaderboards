<template>
	<div class="leader-board">
		<LeaderBoardLine :familyName="'Family Name'" :characterName="'Character Name'" :score="'Level'" />
		<LeaderBoardLine v-for="(participant, index) in participants" :place="index + 1" :key="participant.familyName" :familyName="participant.familyName" :characterName="`${participant.character.name} (${participant.character.class})`" :score="participant.character.level" />
	</div>
</template>

<script>
	import LeaderBoardLine from '@/components/LeaderBoardLine.vue'

	export default {
		name: 'LevelLeaderBoard',
		props: ['guildName'],
		components: { LeaderBoardLine },
		computed: {
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
