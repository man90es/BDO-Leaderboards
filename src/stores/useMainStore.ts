import { defineStore } from "pinia"
import { RegionEnum } from "@/data"
import { take } from "lodash"

const useMainStore = defineStore("main", {
	state: (): {
		customList: Array<{
			profileTarget: string
			region: RegionEnum
		}>
		history: Array<{
			name: string
			region: RegionEnum
			ts: number
		}>
	} => ({
		customList: [],
		history: [],
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
		addGuildToHistory(region: RegionEnum, name: string) {
			const ts = +new Date()
			const i = this.history.findIndex((h) => h.name === name && h.region === region)

			if (i >= 0) {
				this.history[i].ts = ts
			} else {
				this.history.unshift({ ts, name, region })
			}

			const sortedHistory = this.history.toSorted((a, b) => a.ts < b.ts ? 1 : -1)
			this.history = take(sortedHistory, 5)
		}
	},
	persist: { key: "leaderboards-vuex" },
})

export default useMainStore
