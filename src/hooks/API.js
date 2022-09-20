import { reactive, readonly } from "vue"

function parseResponse(response) {
	if (response.ok) {
		return response.json()
	}

	const args = new URL(response.url).searchParams
	const guildName = args.get("guildName")
	const region = args.get("region")

	const message = ({
		400: `Bad guild format «${guildName}».`,
		404: `Couldn't find guild «${guildName}» on ${region} server.`,
		503: "BDO servers are currently under maintenance. Please try again later.",
	})[response.status] || response.statusText

	throw { code: response.status, message }
}

export default function(params) {
	const result = reactive({})

	async function refresh() {
		result.errors = []
		result.guild = {}
		result.players = []
		result.progress = 0

		if (params.value.guildName && params.value.region) {
			const query = new URLSearchParams({ guildName: params.value.guildName, region: params.value.region })
			await fetch(`${process.env.VUE_APP_API_BASE}/v1/guild?${query}`)
				.then(parseResponse)
				.then(profile => result.guild = profile)
				.catch((err) => {
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

		const playerRequestList = params.value.players || result.guild.members

		if (playerRequestList) {
			for (const playerRequest of playerRequestList) {
				const query = new URLSearchParams({
					profileTarget: playerRequest.profileTarget,
					region: playerRequest.region || params.value.region,
				})
				await fetch(`${process.env.VUE_APP_API_BASE}/v1/adventurer?${query}`)
					.then(parseResponse)
					.then(profile => result.players.push(profile))
					.catch((err) => {
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

	refresh()

	return { result: readonly(result), refresh }
}
