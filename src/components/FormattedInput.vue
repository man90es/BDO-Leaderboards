<template>
	<input type="text" v-model="content">
</template>

<script setup>
	import { capitalise } from "../utils"
	import { ref, watch } from "vue"

	const props = defineProps(["modelValue"])
	const emit = defineEmits(["update:modelValue"])
	const content = ref(props.modelValue)

	watch(content, (newValue) => {
		if (newValue.length > 0) {
			content.value = capitalise(newValue).replace(" ", "")
		}

		emit("update:modelValue", content.value)
	})
</script>
