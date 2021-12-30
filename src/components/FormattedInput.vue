<template>
	<input type="text" v-model="content">
</template>

<script>
	import { capitalise } from "../utils"

	export default {
		props: ["modelValue"],
		data() {
			return { content: this.modelValue }
		},
		watch: {
			content: function(newValue) {
				if (newValue.length > 0) {
					this.content = capitalise(newValue).replace(" ", "")
				}

				this.$emit("update:modelValue", this.content)
			}
		}
	}
</script>

<style scoped>
	/* input {
		font-size: 1.25rem;
		padding: 1rem;
		border-radius: 0.5rem;
		border: 0;
		height: 3rem;
	} */
</style>
