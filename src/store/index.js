import { createStore } from 'vuex'

export default createStore({
	state: {
		guilds: {},
		players: {},
		loadingStage: null
	},
	mutations: {
		pushGuild(state, guild) {
			state.guilds[guild.guildName] = guild
		},

		pushPlayer(state, player) {
			state.players[player.familyName] = player
		},

		setLoadingStage(state, stage) {
			state.loadingStage = stage
		}
	},
	actions: {
		requestGuild({ commit, dispatch }, { guildName, region }) {
			commit('setLoadingStage', 'Gathering guild data')

			fetch(`${process.env.VUE_APP_API_BASE}/v0/guildProfile?guildName=${guildName}&region=${region}`)
				.then(response => {
					if (response.ok) {
						return response.json()
					} else {
						throw `${response.status}: ${response.statusText}`
					}
				})
				.then((data) => {
					if ('error' in data) {
						throw data.error
					} else {
						return data
					}
				})
				.then((guildProfile) => {
					commit('setLoadingStage', null)
					commit('pushGuild', guildProfile)
					dispatch('requestMembers', { members: guildProfile.members, total: guildProfile.members.length })
				})
				.catch((err) => {
					commit('setLoadingStage', err)
				})
		},

		requestMembers({ commit, dispatch }, { members, total }) {
			let member = members.shift()

			commit('setLoadingStage', `Gathering member data ${total - members.length}/${total}`)

			fetch(`${process.env.VUE_APP_API_BASE}/v0/profile?profileTarget=${member.profileTarget}`)
				.then(response => {
					if (response.ok) {
						return response.json()
					} else {
						throw `${response.status}: ${response.statusText}`
					}
				})
				.then((data) => {
					if ('error' in data) {
						throw data.error
					} else {
						return data
					}
				})
				.then((playerProfile) => {
					commit('pushPlayer', playerProfile)

					if (members.length > 0) {
						dispatch('requestMembers', { members, total })
					} else {
						commit('setLoadingStage', null)
					}
				})
				.catch((err) => {
					commit('setLoadingStage', err)
				})
		}
	},
	getters: {
		members: (state) => (guildName) => {
			return Object.values(state.players).filter((player) => {
				return player.guild && player.guild.guildName == guildName
			})
		}
	}
})
