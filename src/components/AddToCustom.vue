<template>
	<form id="add-to-custom" @submit="okHandler" :class="{ 'mobile-layout': $store.state.mobile }">
		<label>Enter the family name of someone you want to add here:</label>
		<RegionSelect v-model="region" />
		<FormattedInput placeholder="Family name" v-model="familyName" />
		<button>↩</button>
		<div v-if="status" id="status">{{ status }}</div>
	</form>
</template>

<script>
	import RegionSelect from "./RegionSelect.vue"
	import FormattedInput from "./FormattedInput.vue"

	export default {
		name: "AddToCustom",
		data() {
			return {
				region: "EU",
				familyName: "",
				status: "",
			}
		},
		components: {
			RegionSelect,
			FormattedInput,
		},
		methods: {
			okHandler(event) {
				event.preventDefault()

				const maxProfiles = 100
				if (this.$store.state.customList.length >= maxProfiles) {
					this.status = `Failed to add ${this.familyName}: You can't add more than ${maxProfiles} custom profiles`
					return
				}

				fetch(`${process.env.VUE_APP_API_BASE}/v1/adventurer/search?region=${this.region}&query=${this.familyName}&searchType=familyName`)
					.then((response) => {
						if (response.ok) {
							return response.json()
						} else {
							throw response.statusText
						}
					})
					.then(profiles => {
						this.$store.dispatch('requestMembers', {
							members: [{ profileTarget: profiles[0].profileTarget }],
							total:   1,
						})

						return profiles[0]
					})
					.then(profile => {
						this.$store.commit('addToCustomList', profile.profileTarget)
						this.status = `Added ${profile.familyName}`
					})
					.catch((err) => {
						console.log(err)
						this.status = `Failed to add ${this.familyName}: ${err}`
					})
			}
		}
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
