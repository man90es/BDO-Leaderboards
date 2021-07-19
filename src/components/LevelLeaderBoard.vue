<template>
	<div class="leader-board">
		<LeaderBoardHeaderLine :headers="['#', 'Family Name', 'Character', 'Level']" />
		<LeaderBoardLine v-for="p in participants" :key="p.profile.familyName" v-bind="p" />
	</div>
</template>

<script>
	import LeaderBoardHeaderLine from './LeaderBoardHeaderLine.vue'
	import LeaderBoardLine from './LeaderBoardLine.vue'
	import { sortByScore, assignPlaces, PRIVATE_LEVEL } from '../helpers'
	import { Participant } from '../models'

	export default {
		name: 'LevelLeaderBoard',
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
							let memberRep = member.characters
								.sort((characterA, characterB) => { // Choose member's character with the highest level
									return characterA.level > characterB.level ? -1 : 1
								})[0]

							return new Participant(member, memberRep, memberRep.level)
						}
					})
					.sort(sortByScore)
					.map(assignPlaces)
			}
		}
	}
</script>
