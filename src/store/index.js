import { createStore } from 'vuex'
import { PRIVATE_GUILD } from '../helpers'

function parseResponse(response) {
	if (response.ok) {
		return response.json()
	} else {
		throw `${response.status}: ${response.statusText}`
	}
}

export default createStore({
	state: {
		guilds: {},
		players: {},
		loadingStage: null,
		mobile: innerWidth < innerHeight
	},
	mutations: {
		pushGuild(state, guild) {
			state.guilds[guild.name.toLowerCase()] = guild
		},

		pushPlayer(state, player) {
			state.players[player.familyName] = player
		},

		setLoadingStage(state, stage) {
			state.loadingStage = stage
		},

		setMobile(state, value) {
			state.mobile = value
		}
	},
	actions: {
		requestGuild({ commit, dispatch }, { guildName, region }) {
			commit('setLoadingStage', 'Gathering guild data')

			fetch(`${process.env.VUE_APP_API_BASE}/v1/guild?guildName=${guildName}&region=${region}`)
				.then(parseResponse)
				.then((guildProfile) => {
					commit('setLoadingStage', null)
					commit('pushGuild', guildProfile)
					dispatch('requestMembers', { members: [...guildProfile.members], total: guildProfile.population })
				})
				.catch(err => commit('setLoadingStage', err))
		},

		requestMembers({ commit, dispatch }, { members, total }) {
			commit('setLoadingStage', `Gathering intel: ${Math.floor((total - members.length) / total * 100)}%`)
			let member = members.shift()

			fetch(`${process.env.VUE_APP_API_BASE}/v1/adventurer?profileTarget=${member.profileTarget}`)
				.then(parseResponse)
				.then(playerProfile => commit('pushPlayer', playerProfile))
				.catch(err => commit('setLoadingStage', err))
				.finally(() => {
					if (members.length > 0) {
						dispatch('requestMembers', { members, total })
					} else {
						commit('setLoadingStage', null)
					}
				})
		}
	},
	getters: {
		members: (state) => (guildName) => {
			if (state.loadingStage !== null) {
				return []
			} else {
				return state.guilds[guildName.toLowerCase()].members
					.filter(member => {
						// The official website does not always update when someone leaves the guild; this should filter some ex-members out
						// I have no idea how to filter out ex-members with private guild setting though

						let profile = state.players[member.familyName]

						if (profile.guild !== undefined && profile.guild.name.toLowerCase() == guildName.toLowerCase()) {
							// They are probably in the guild: double checked
							return true
						} else if (profile.privacy & PRIVATE_GUILD) {
							// The guild in the profile is set to private: can't double check
							return true
						} else {
							// Either no guild or other guild
							return false
						}
					})
					.map(member => state.players[member.familyName])
			}
		}
	}
})
