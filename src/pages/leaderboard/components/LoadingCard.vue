<template>
	<div class="bs-card">
		<div>
			This may take a while...
		</div>
		<div>
			{{ Math.round(progress * 100) }}%
			<meter :value="progress" min="0" max="1" />
		</div>
	</div>
</template>

<script setup lang="ts">
	defineProps<{ progress: number }>()
</script>

<style scoped>
	.bs-card {
		display: flex !important;
		flex-direction: column;
		justify-content: center;

		& div {
			display: flex;
			gap: 1em;
			justify-content: center;
		}
	}

	meter {
		width: 50%;
	}
</style>
