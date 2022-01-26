<template>
	<div><slot /></div>
</template>

<style lang="scss" scoped>
	div {
		--or-margin: 2em;

		background-color: var(--card-colour);
		font-size: 0.8em;
		font-weight: bold;
		grid-column: 1/3;
		margin: 1rem 0;
		opacity: 0.5;
		text-align: center;
		user-select: none;

		&::before, &::after {
			content: "";
			display: block;

			background-color: var(--text-colour);
			height: 1px;
			width: calc(50% - var(--or-margin));
		}

		&::before {
			transform: translate(0, 0.6em);
		}

		&::after {
			margin-left: calc(50% + var(--or-margin));
			transform: translate(0, -0.6em);
		}
	}
</style>
