import { createStore } from 'vuex'

function parseResponse(response) {
	if (response.ok) {
		return response.json()
	} else {
		throw `${response.status}: ${response.statusText}`
	}
}

function findAndThrowError(data) {
	if ('error' in data) {
		throw data.error
	} else {
		return data
	}
}

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
				.then(parseResponse)
				.then(findAndThrowError)
				.then((data) => {
					if('members' in data) {
						return data
					} else {
						throw `The guild «${guildName}» does not exist on the ${region} server`
					}
				})
				.then((guildProfile) => {
					commit('setLoadingStage', null)
					commit('pushGuild', guildProfile)
					dispatch('requestMembers', { members: guildProfile.members, total: guildProfile.members.length })
				})
				.catch(err => commit('setLoadingStage', err))
		},

		requestMembers({ commit, dispatch }, { members, total }) {
			commit('setLoadingStage', `Gathering member data: ${Math.floor((total - members.length) / total * 100)}%`)
			let member = members.shift()

			fetch(`${process.env.VUE_APP_API_BASE}/v0/profile?profileTarget=${member.profileTarget}`)
				.then(parseResponse)
				.then(findAndThrowError)
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
			return Object.values(state.players).filter((player) => {
				return player.guild && player.guild.guildName == guildName
			})
		}
	}
})
