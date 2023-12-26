import { defineStore } from "pinia"
import { RegionEnum } from "@/data"

const useMainStore = defineStore("main", {
	state: (): {
		customList: Array<{
			profileTarget: string
			region: RegionEnum
		}>
		lastGuild: {
			name?: string
			region?: RegionEnum
		}
	} => ({
		customList: [],
		lastGuild: {
			name: undefined,
			region: undefined,
		},
	}),
	actions: {
		addToCustomList(profileTarget: string, region: RegionEnum) {
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
		removeFromCustomList(profileTarget: string, region: RegionEnum) {
			this.customList = this.customList.filter((onList) => (
				!(onList.profileTarget === profileTarget && onList.region === region)
			))
		},
	},
	persist: { key: "leaderboards-vuex" },
})

export default useMainStore
