<template>
	<form id="add-to-custom" @submit="okHandler" :class="{ 'mobile-layout': $store.state.mobile }">
		<label>Enter the family name of someone you want to add here:</label>
		<div class="radio-box">
			<input type="radio" value="EU" id="region-EU" v-model="region">
			<label for="region-EU">EU</label>
			<input type="radio" value="NA" id="region-NA" v-model="region">
			<label for="region-NA">NA</label>
		</div>
		<input type="text" placeholder="Family name" v-model="familyName">
		<button>↩</button>
		<div v-if="status" id="status">{{ status }}</div>
	</form>
</template>

<script>
	import { capitalise } from "../core/utils"

	export default {
		name: "AddToCustom",

		data() {
			return {
				region: "EU",
				familyName: "",
				status: "",
			}
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
		},

		watch: {
			familyName: function(newValue) {
				// Capitalise family name and remove spaces, as it is done in the game
				if (newValue.length > 0) {
					this.familyName = capitalise(newValue).replace(" ", "")
				}
			},
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
