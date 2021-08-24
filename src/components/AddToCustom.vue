<template>
	<form id="add-to-custom" @submit="okHandler" :class="{ 'mobile-layout': $store.state.mobile }">
		<label>Enter the family name of someone you want to add here:</label>
		<RegionSelect v-model="region" />
		<FormattedInput placeholder="Family name" v-model="familyName" />
		<button>↩</button>
		<div v-if="status" id="status">{{ status }}</div>
	</form>
</template>

<script setup>
	import { ref } from "vue"
	import { useStore } from "vuex"

	import RegionSelect from "./RegionSelect.vue"
	import FormattedInput from "./FormattedInput.vue"

	const store = useStore()
	const maxProfiles = 100

	const region = ref("EU")
	const familyName = ref("")
	const status = ref("")

	function okHandler(event) {
		event.preventDefault()

		if (store.state.customList.length >= maxProfiles) {
			status.value = `Failed to add ${familyName.value}: You can't add more than ${maxProfiles} custom profiles`
			return
		}

		fetch(`${process.env.VUE_APP_API_BASE}/v1/adventurer/search?region=${region.value}&query=${familyName.value}&searchType=familyName`)
			.then((response) => {
				if (response.ok) {
					return response.json()
				} else {
					throw response.statusText
				}
			})
			.then(profiles => {
				store.dispatch("requestMembers", {
					members: [{ profileTarget: profiles[0].profileTarget }],
					total:   1,
				})

				return profiles[0]
			})
			.then(profile => {
				store.commit("addToCustomList", profile.profileTarget)
				status.value = `Added ${profile.familyName}`
			})
			.catch((err) => {
				console.log(err)
				status.value = `Failed to add ${familyName.value}: ${err}`
			})
	}
</script>

<style lang="scss">
	#add-to-custom {
		margin-top: 3em;
		display: grid;
		gap: 1em;

		label, #status {
			text-align: center;
		}

		&:not(.mobile-layout) {
			grid-template-columns: repeat(3, auto);

			label, #status {
				grid-column: 1/4;
			}
		}
	}
</style>
