import { RegionEnum } from "@/data"
import type { Player } from "."

export type Guild = {
	members: Player[]
	name: string
	population: number
	region: RegionEnum
}
