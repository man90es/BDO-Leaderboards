import type { Character } from "./Character"
import type { Guild } from "./Guild"
import type { RegionEnum } from "@/data"

export type Player = {
	characters: Character[]
	combatFame: number
	contributionPoints: number
	createdOn: string
	guild: Guild
	lifeFame: number
	privacy: number
	profileTarget: string
	region: RegionEnum
	specLevels: Record<string, string>
}
