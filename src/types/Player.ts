import type { Character } from "./Character"
import type { Guild } from "./Guild"
import type { RegionEnum } from "@/data"

export type Player = {
	characters: Character[]
	contributionPoints: number
	createdOn: string
	guild: Guild
	privacy: number
	profileTarget: string
	region: RegionEnum
}
