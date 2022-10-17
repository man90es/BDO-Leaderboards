<template>
	<ContentCard>
		<div>
			This may take a while...
		</div>
		<div>
			{{ Math.round(progress * 100) }}%
			<meter :value="progress" min="0" max="1" />
		</div>
	</ContentCard>
</template>

<script setup>
	import ContentCard from "@/components/ContentCard"

	defineProps({
		progress: { required: true, type: Number }
	})
</script>

<style lang="scss" scoped>
	.content-card {
		display: flex !important;
		flex-direction: column;
		justify-content: center;

		div {
			display: flex;
			gap: 1em;
			justify-content: center;
		}
	}

	meter {
		width: 50%;
	}
</style>
