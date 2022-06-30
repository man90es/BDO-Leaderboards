import { createStore } from "vuex"
import Memento from "memento-vuex"

export default createStore({
	state: {
		customList: [],
		mobile: innerWidth < innerHeight,
		lastGuild: {
			name:   null,
			region: null,
		},
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

		toggleSiteTheme(state) {
			state.siteTheme = state.siteTheme === "light" ? "dark" : "light"
		},

		import(state, backup) {
			Object.assign(state, backup)
		},
	},
})
