import { reactive } from "vue"

function parseResponse(response) {
	if (response.ok) {
		return response.json()
	}

	throw ({
		400: "A guild with this name doesn't exist",
		404: "Couldn't find a guild with this name",
		503: "BDO servers are currently under maintenance",
	})[response.status] || response.statusText
}

export default function (params) {
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
				.catch(err => result.errors.push(err))
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
					.catch(err => result.errors.push(err))
					.finally(() => {
						result.progress = (result.players.length + result.errors.length) / playerRequestList.length
					})
			}
		}

		result.progress = 1
	}

	refresh()

	return { result, refresh }
}
