import { defineStore } from "pinia"

export const useMainStore = defineStore("main", {
	state: () => ({
		customList: [],
		lastGuild: {
			name: null,
			region: null,
		},
		siteTheme: "dark",
	}),
	actions: {
		addToCustomList(profileTarget, region) {
			const found = this.customList.find((onList) => (
				onList.profileTarget === profileTarget && onList.region === region
			))

			if (!found) {
				this.customList.push({
					profileTarget,
					region,
				})
			}
		},

		removeFromCustomList(profileTarget, region) {
			this.customList = this.customList.filter((onList) => (
				!(onList.profileTarget === profileTarget && onList.region === region)
			))
		},

		toggleSiteTheme() {
			this.siteTheme = this.siteTheme === "light" ? "dark" : "light"
		},
	},
	persist: {
		key: "leaderboards-vuex",
		serializer: {
			serialize: JSON.stringify,
			deserialize: (string) => {
				const parsed = JSON.parse(string)

				// Detect and restore from legacy format used before July 2022
				if (parsed.customList?.length && "string" === typeof parsed.customList[0]) {
					return {
						...parsed,
						customList: parsed.customList
							.map(profileTarget => ({
								profileTarget: decodeURIComponent(profileTarget),
								region: "EU",
							}))
					}
				}

				return parsed
			}
		}
	},
})
