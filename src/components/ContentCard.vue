<template>
	<div class="content-card">
		<slot></slot>
	</div>
</template>

<style lang="scss" scoped>
	.content-card {
		padding: 2em;
		background-color: var(--colour-white);
		color: var(--colour-black);
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5em;
		box-shadow: 0 0 1em var(--colour-black);
		border-radius: 0.1em;
	}
</style>
