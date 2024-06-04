<template>
	<div class="bs-card">
		<label>Add a player to the leaderboard:</label>
		<input
			autocapitalize="on"
			class="bs-input"
			placeholder="Enter family name"
			v-model="familyName"
		/>
		<button
			:class="className"
			:key="domain"
			@click="() => okHandler(domain)"
			v-for="{ className, domain, name } of supportedServers"
		>
			From {{ name }}
		</button>
		<span
			v-if="status"
			id="status"
		>
			{{ status }}
		</span>
	</div>
</template>

<script setup lang="ts">
	import { ref } from "vue"
	import { RegionEnum, supportedServers } from "@/data"
	import { useMainStore } from "@/stores"

	const props = defineProps<{ refreshLeaderboard: () => void }>()

	const familyName = ref("")
	const maxProfiles = 100
	const status = ref("")
	const store = useMainStore()

	function okHandler(region: RegionEnum) {
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
				status.value = `Failed to add ${familyName.value}: ${err}`
			})
	}
</script>

<style scoped>

	span,
	label,
	input {
		text-align: center;
		grid-column: 1/3;
	}
</style>
