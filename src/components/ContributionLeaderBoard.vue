<template>
	<div class="leader-board">
		<LeaderBoardHeaderLine :headers="['#', 'Family Name', null, 'CP']" />
		<LeaderBoardLine v-for="p in participants" :key="p.profile.familyName" v-bind="p" />
	</div>
</template>

<script>
	import LeaderBoardHeaderLine from './LeaderBoardHeaderLine.vue'
	import LeaderBoardLine from './LeaderBoardLine.vue'
	import { sortByScore, assignPlaces, PRIVATE_CONTRIB } from '../helpers'
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
						return new Participant(member, null, member.contributionPoints || -1, member.privacy && PRIVATE_CONTRIB ? 'Private' : undefined)
					})
					.sort(sortByScore)
					.map(assignPlaces)
			}
		}
	}
</script>
