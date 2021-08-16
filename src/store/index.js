import { createStore } from 'vuex'
import Memento from "memento-vuex"

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
		customList: [],
		loadingStage: null,
		mobile: innerWidth < innerHeight
	},
	plugins: [
		Memento(
			{
				addToCustomList: "customList",
				removeFromCustomList: "customList",
			},
			"leaderboards-vuex"
		)
	],
	mutations: {
		pushGuild(state, guild) {
			state.guilds[guild.name.toLowerCase()] = guild
		},

		pushPlayer(state, player) {
			state.players[player.profileTarget] = player
		},

		setLoadingStage(state, stage) {
			state.loadingStage = stage
		},

		setMobile(state, value) {
			state.mobile = value
		},

		addToCustomList(state, profileTarget) {
			if (!state.customList.includes(profileTarget)) {
				state.customList.push(profileTarget)
			}
		},

		removeFromCustomList(state, profileTarget) {
			state.customList = state.customList.filter(p => p !== profileTarget)
		},

		import(state, backup) {
			Object.assign(state, backup)
		},
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

		requestCustomList({dispatch, state}) {
			dispatch('requestMembers', {
				members: state.customList.map(profileTarget => { return { profileTarget } }),
				total: state.customList.length,
			})
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

						let profile = state.players[member.profileTarget]

						if (profile.guild !== undefined && profile.guild.name.toLowerCase() == guildName.toLowerCase()) {
							// They are probably in the guild: double checked
							return true
						} else if (profile.privacy & 0b10) {
							// The guild in the profile is set to private: can't double check
							return true
						} else {
							// Either no guild or other guild
							return false
						}
					})
					.map(member => state.players[member.profileTarget])
			}
		},

		customMembers: (state) => {
			if (state.loadingStage !== null) {
				return []
			} else {
				return state.customList
					.map(profileTarget => state.players[profileTarget])
			}
		}
	}
})
