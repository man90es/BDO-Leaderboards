<template>
	<div class="leader-board">
		<LeaderBoardHeaderLine :headers="['#', 'Family Name', null, 'Combat Fame']" />
		<LeaderBoardLine v-for="p in participants" :key="p.profile.familyName" v-bind="p" />
	</div>
</template>

<script>
	import LeaderBoardHeaderLine from './LeaderBoardHeaderLine.vue'
	import LeaderBoardLine from './LeaderBoardLine.vue'
	import { sortByScore, assignPlaces, PRIVATE_LEVEL } from '../helpers'
	import { Participant } from '../models'

	export default {
		name: 'ContributionLeaderBoard',
		components: {
			LeaderBoardHeaderLine,
			LeaderBoardLine,
		},
		computed: {
			participants() {
				return this.$store.getters.members(this.$route.params.guildName)
					.map((member) => { // Convert members to participants
						if (member.privacy & PRIVATE_LEVEL) {
							return new Participant(member, null, -1, 'Private')
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

							return new Participant(member, null, combatFame)
						}
					})
					.sort(sortByScore)
					.map(assignPlaces)
			}
		}
	}
</script>
