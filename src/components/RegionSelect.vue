<template>
	<div>
		<input type="radio" value="EU" id="region-EU" v-model="content">
		<label for="region-EU">EU</label>
		<input type="radio" value="NA" id="region-NA" v-model="content">
		<label for="region-NA">NA</label>
	</div>
</template>

<script>
	export default {
		props: ["modelValue"],
		data() {
			return { content: this.modelValue }
		},
		watch: {
			content: function(newValue) {
				this.$emit("update:modelValue", newValue)
			}
		}
	}
</script>

<style scoped lang="scss">
	div {
		font-size: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1em;

		input {
			display: none;

			&:checked + label {
				border-color: #fff;
			}
		}

		label {
			border-bottom: 0.1em solid transparent;
			cursor: pointer;
			color: #fff;
		}
	}
</style>
