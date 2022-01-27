<template>
	<content-card>
		<radial-progress :completed-steps="$store.state.loading.progress" :total-steps="$store.state.loading.total" :innerStrokeColor="innerColour" :stopColor="injectColour" :startColor="injectColour">
			{{ $store.state.loading.msg }}
		</radial-progress>
	</content-card>
</template>

<script setup>
	import RadialProgress from "vue3-radial-progress"

	import ContentCard from "@/components/ContentCard.vue"

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
