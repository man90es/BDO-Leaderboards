import { ComputedRef, reactive, readonly } from "vue"
import { RegionEnum } from "@/data"
import type { Guild, Player } from "@/types"

type Err = {
	code?: number
	message: string
}

export type APIResult = {
	errors: Err[]
	guild: Guild
	players: Player[]
	progress: number
}

// Function to parse the response from the API
function parseResponse<T>(response: Response): Promise<T> {
	if (response.ok) {
		return response.json() as Promise<T>
	}

	// Get the guildName and region from the URL parameters
	const args = new URL(response.url).searchParams
	const guildName = args.get("guildName")
	const region = args.get("region")

	// Define error messages based on the response status code
	const message = ({
		400: `Bad guild format «${guildName}».`,
		404: `Couldn't find guild «${guildName}» on ${region} server.`,
		503: "BDO servers are currently under maintenance. Please try again later.",
	})[response.status] || response.statusText

	// Throw an error object with the code and message
	throw { code: response.status, message }
}

// Custom hook to fetch guild and player data
export default function useGuild(params: ComputedRef<{ guildName?: Guild["name"], region?: Guild["region"], players?: Player[] }>) {
	const result = reactive<APIResult>({
		errors: [],
		guild: {
			members: [],
			name: "",
			population: 0,
			region: RegionEnum.EU,
		},
		players: [],
		progress: 0
	})

	// Function to refresh the guild and player data
	async function refresh() {
		// Reset the result object
		result.errors = []
		result.guild = {
			members: [],
			name: "",
			population: 0,
			region: RegionEnum.EU,
		}
		result.players = []
		result.progress = 0

		// Fetch guild data if guildName and region are provided
		if (params.value.guildName && params.value.region) {
			const query = new URLSearchParams({ guildName: params.value.guildName, region: params.value.region })
			await fetch(`${process.env.VUE_APP_API_BASE}/v1/guild?${query}`)
				.then(parseResponse<Guild>)
				.then(profile => result.guild = profile)
				.catch((err: Err) => {
					err.code
						? result.errors.push(err)
						: result.errors.push({
							message: `${err.message}: Please check your internet connection`
						})
				})
				.finally(() => {
					result.progress = 1 / (result.guild.population + 1)
				})
		}

		// Fetch player data for each player in the playerRequestList
		const playerRequestList = params.value.players || result.guild.members
		if (playerRequestList) {
			for (const playerRequest of playerRequestList) {
				const query = new URLSearchParams({
					profileTarget: playerRequest.profileTarget,
					region: playerRequest.region || params.value.region,
				})
				await fetch(`${process.env.VUE_APP_API_BASE}/v1/adventurer?${query}`)
					.then(parseResponse<Player>)
					.then(profile => result.players.push(profile))
					.catch((err: Err) => {
						err.code
							? result.errors.push(err)
							: result.errors.push({
								message: `${err.message}: Please check your internet connection`
							})
					})
					.finally(() => {
						result.progress = (result.players.length + result.errors.length) / playerRequestList.length
					})
			}
		}

		result.progress = 1
	}

	// Call the refresh function when the hook is first called
	refresh()

	// Return the result object and the refresh function
	return { result: readonly(result), refresh }
}
