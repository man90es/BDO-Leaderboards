<template>
	<content-card>
		<label>Add a player to the leaderboard:</label>
		<input autocapitalize="on" placeholder="Enter his or her family name here" v-model="familyName" />
		<button :key="server.domain" :style="{ backgroundColor: server.colour }" @click="() => okHandler(server.domain)" v-for="server of supportedServers">
			From {{server.name}}
		</button>
		<span v-if="status" id="status">{{ status }}</span>
	</content-card>
</template>

<script setup>
	import { ContentCard } from "@/components"
	import { ref } from "vue"
	import { supportedServers } from "@/utils"
	import { useMainStore } from "@/stores/main"

	const familyName = ref("")
	const maxProfiles = 100
	const status = ref("")
	const store = useMainStore()

	const props = defineProps({
		refreshLeaderboard: {
			type: Function,
			required: true,
		}
	})

	function okHandler(region) {
		if (store.customList.length >= maxProfiles) {
			status.value = `Failed to add ${familyName.value}: You can't add more than ${maxProfiles} custom profiles`
			return
		}

		const params = new URLSearchParams({
			query: familyName.value,
			region,
			searchType: "familyName",
		})

		fetch(`${process.env.VUE_APP_API_BASE}/v1/adventurer/search?${params}`)
			.then((response) => {
				if (!response.ok) {
					throw response.statusText
				}

				return response.json()
			})
			.then(([{ profileTarget, familyName }]) => {
				store.addToCustomList(profileTarget, region)
				status.value = `Added ${familyName}`
			})
			.then(props.refreshLeaderboard)
			.catch((err) => {
				console.log(err)
				status.value = `Failed to add ${familyName.value}: ${err}`
			})
	}
</script>

<style scoped>
	span,
	label,
	input {
		grid-column: 1/3;
		text-align: center;
	}
</style>
