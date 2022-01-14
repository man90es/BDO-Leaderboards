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

	const innerColour = getComputedStyle(document.documentElement).getPropertyValue("--colour-grey")
	const injectColour = getComputedStyle(document.documentElement).getPropertyValue("--colour-green")
</script>

<style scoped>
	.content-card {
		display: flex !important;
		justify-content: center;
		text-align: center;
	}
</style>
