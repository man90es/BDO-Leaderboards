<template>
	<div class="content-card">
		<slot></slot>
	</div>
</template>

<style scoped>
	.content-card {
		padding: 2em;
		background-color: var(--card-colour);
		color: var(--text-colour);
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5em;
		box-shadow: 0 0.5em 1em var(--card-shadow-colour);
		border-radius: 0.3em;
		position: relative;
	}
</style>
