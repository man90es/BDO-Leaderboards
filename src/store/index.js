import { createStore } from 'vuex'

export default createStore({
	state: {
		guilds: {},
		players: {}
	},
	mutations: {
		pushGuild(state, payload) {
			state.guilds[payload.guildName] = payload
		},

		pushPlayer(state, payload) {
			state.players[payload.familyName] = payload
		}
	},
	actions: {
		requestGuild({ commit, dispatch }, { guildName, region }) {
			fetch(`${process.env.VUE_APP_API_BASE}/v0/guildProfile?guildName=${guildName}&region=${region}`)
				.then(response => {
					if (response.ok) {
						return response.json()
					} else {
						throw `${response.status}: ${response.statusText}`
					}
				})
				.then((guildProfile) => {
					commit('pushGuild', guildProfile)
					dispatch('requestMembers', guildProfile.members)
				})
		},

		requestMembers({ commit, dispatch }, members) {
			let member = members.shift()

			fetch(`${process.env.VUE_APP_API_BASE}/v0/profile?profileTarget=${member.profileTarget}`)
				.then(response => {
					if (response.ok) {
						return response.json()
					} else {
						throw `${response.status}: ${response.statusText}`
					}
				})
				.then((playerProfile) => {
					commit('pushPlayer', playerProfile)

					if (members.length > 0) {
						dispatch('requestMembers', members)
					}
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
