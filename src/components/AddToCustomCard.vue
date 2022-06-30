<template>
	<content-card>
		<label>Add a player to the leaderboard:</label>
		<formatted-input placeholder="Enter his or her family name here" v-model="familyName" />
		<button class="eu-colour" @click="() => okHandler('EU')">From Europe</button>
		<button class="na-colour" @click="() => okHandler('NA')">From North America</button>
		<span v-if="status" id="status">{{ status }}</span>
	</content-card>
</template>

<script setup>
	import { ref } from "vue"
	import { useStore } from "vuex"
	import ContentCard from "@/components/ContentCard.vue"
	import FormattedInput from "@/components/FormattedInput.vue"

	const store = useStore()
	const maxProfiles = 100

	const familyName = ref("")
	const status = ref("")

	const props = defineProps({
		refreshLeaderboard: {
			type: Function,
			required: true,
		}
	})

	function okHandler(region) {
		if (store.state.customList.length >= maxProfiles) {
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
				if (response.ok) {
					return response.json()
				} else {
					throw response.statusText
				}
			})
			.then(([profile]) => {
				store.commit("addToCustomList", profile.profileTarget)
				status.value = `Added ${profile.familyName}`
			})
			.then(props.refreshLeaderboard)
			.catch((err) => {
				console.log(err)
				status.value = `Failed to add ${familyName.value}: ${err}`
			})
	}
</script>

<style lang="scss" scoped>
	span, label, input {
		grid-column: 1/3;
		text-align: center;
	}

	.content-card {
		margin-bottom: 0.5em;
	}
</style>
