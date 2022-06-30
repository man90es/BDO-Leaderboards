<template>
	<content-card>
		<radial-progress :completed-steps="progress" :total-steps="1" :innerStrokeColor="innerColour" :stopColor="injectColour" :startColor="injectColour">
			Loading...
		</radial-progress>
	</content-card>
</template>

<script setup>
	import ContentCard from "@/components/ContentCard.vue"
	import RadialProgress from "vue3-radial-progress"

	defineProps({
		progress: {
			required: true,
			type: Number,
		}
	})

	const innerColour = getComputedStyle(document.body).getPropertyValue("--load-remaining-colour")
	const injectColour = getComputedStyle(document.body).getPropertyValue("--load-done-colour")
</script>

<style scoped>
	.content-card {
		display: flex !important;
		justify-content: center;
		text-align: center;
	}
</style>
