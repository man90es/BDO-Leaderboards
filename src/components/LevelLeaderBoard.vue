<template>
	<div class="leader-board">
		<LeaderBoardLine :familyName="'Family Name'" :characterName="'Character'" :score="'Level'" />
		<LeaderBoardLine v-for="p in participants" :key="p.familyName"
			:hidePlace="p.groupWPrev"
			:place="p.place"
			:colour="p.colour"
			:familyName="p.familyName"
			:characterClass="p.class"
			:characterName="p.name"
			:score="p.level"
		/>
	</div>
</template>

<script>
	import LeaderBoardLine from './LeaderBoardLine.vue'
	import { sortByAttribute, assignPlaces, PRIVATE_LEVEL } from '../helpers'

	function Participant(familyName, characterName, characterClass, characterLevel = 1) {
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
		components: { LeaderBoardLine },
		computed: {
			participants() {
				return this.$store.getters.members(this.$route.params.guildName)
					.map((member) => { // Convert members to participants
						if (member.privacy & PRIVATE_LEVEL) {
							return new Participant(member.familyName, null, null, 'Private')
						} else {
							let memberRep = member.characters
								.sort((characterA, characterB) => { // Choose member's character with the highest level
									return characterA.level > characterB.level ? -1 : 1
								})[0]

							return new Participant(member.familyName, memberRep.name, memberRep.class, memberRep.level)
						}
					})
					.sort(sortByAttribute('level'))
					.map(assignPlaces('level'))
			}
		}
	}
</script>
