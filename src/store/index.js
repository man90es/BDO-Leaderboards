import { createStore } from "vuex"
import Memento from "memento-vuex"

function parseResponse(response) {
	if (response.ok) {
		return response.json()
	} else {
		switch (response.status) {
			case 400:
				throw "A guild with this name doesn't exist"
			case 404:
				throw "Couldn't find a guild with this name"
			case 503:
				throw "BDO servers are currently under maintenance"
			default:
				throw response.statusText
		}
	}
}

export default createStore({
	state: {
		guilds: {},
		players: {},
		customList: [],
		loading: { stage: -1 },
		mobile: innerWidth < innerHeight,
		lastGuild: {
			name:   null,
			region: null,
		},
		shouldStopRequests: false,
		siteTheme: "dark",
	},
	plugins: [
		Memento(
			{
				addToCustomList:      "customList",
				removeFromCustomList: "customList",
				setLastGuild:         "lastGuild",
				toggleSiteTheme:      "siteTheme",
			},
			"leaderboards-vuex"
		)
	],
	mutations: {
		pushGuild(state, guild) {
			state.guilds[`${guild.region}/${guild.name}`.toLowerCase()] = guild
		},

		pushPlayer(state, player) {
			state.players[player.profileTarget] = player
		},

		updateLoading(state, stage) {
			state.loading = {...state.loading, ...stage}
		},

		setMobile(state, value) {
			state.mobile = value
		},

		setLastGuild(state, value) {
			state.lastGuild = value
		},

		addToCustomList(state, profileTarget) {
			if (!state.customList.includes(profileTarget)) {
				state.customList.push(profileTarget)
			}
		},

		removeFromCustomList(state, profileTarget) {
			state.customList = state.customList.filter(p => p !== profileTarget)
		},

		setShouldStopRequests(state, value) {
			state.shouldStopRequests = value
		},

		toggleSiteTheme(state) {
			state.siteTheme = state.siteTheme === "light" ? "dark" : "light"
		},

		import(state, backup) {
			Object.assign(state, backup)
		},
	},
	actions: {
		requestGuild({ state, commit, dispatch }, { guildName, region }) {
			commit("updateLoading", { stage: 0, msg: "Requesting guild members list", progress: 1, total: 100 })
			const guildId = `${region}/${guildName}`.toLowerCase()

			function reqMembers(guildProfile) {
				if (!state.shouldStopRequests) {
					dispatch("requestMembers", { members: [...guildProfile.members], total: guildProfile.population })
				}
			}

			if (state.guilds[guildId]) {
				reqMembers(state.guilds[guildId])
			} else {
				fetch(`${process.env.VUE_APP_API_BASE}/v1/guild?guildName=${guildName}&region=${region}`)
					.then(parseResponse)
					.then((guildProfile) => {
						commit("pushGuild", guildProfile)
						reqMembers(guildProfile)
					})
					.catch(err => commit("updateLoading", { stage: 3, msg: err }))
			}
		},

		requestCustomList({dispatch, state}) {
			dispatch("requestMembers", {
				members: state.customList.map(profileTarget => { return { profileTarget } }),
				total: state.customList.length,
			})
		},

		requestMembers({ state, commit, dispatch }, { members, total }) {
			if (members.length < 1 || state.shouldStopRequests) {
				commit("updateLoading", { stage: 2, msg: "Complete" })
				return
			}

			commit("updateLoading", { stage: 1, msg: "Requesting members' data", progress: total - members.length + 1, total: total + 1 })
			const member = members.shift()

			if (state.players[member.profileTarget]) {
				dispatch("requestMembers", { members, total })
			} else {
				fetch(`${process.env.VUE_APP_API_BASE}/v1/adventurer?profileTarget=${member.profileTarget}`)
					.then(parseResponse)
					.then(playerProfile => commit("pushPlayer", playerProfile))
					.catch(err => commit("updateLoading", { stage: 3, msg: err }))
					.finally(() => dispatch("requestMembers", { members, total }))
			}
		}
	},
	getters: {
		members: state => (region, guildName) => {
			return state.guilds[`${region}/${guildName}`.toLowerCase()].members
				.filter(member => {
					// The official website does not always update when someone leaves the guild; this should filter some ex-members out
					// I have no idea how to filter out ex-members with private guild setting though

					let profile = state.players[member.profileTarget]

					if (profile?.guild !== undefined && profile?.guild.name.toLowerCase() == guildName.toLowerCase()) {
						// They are probably in the guild: double checked
						return true
					} else if (profile?.privacy & 0b10) {
						// The guild in the profile is set to private: can't double check
						return true
					} else {
						// Either no guild or other guild
						return false
					}
				})
				.map(member => state.players[member.profileTarget])
		},

		customMembers: (state) => {
			if (state.loading.stage < 0 || state.loading.stage === 2) {
				return state.customList
					.map(profileTarget => state.players[profileTarget])
			} else {
				return []
			}
		}
	}
})
