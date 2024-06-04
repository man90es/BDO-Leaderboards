<template>
	<div class="bs-card">
		<h1>BDO Leaderboards</h1>
		<span>Your Black Desert Online guild's leaderboard is already here!</span>
		<img
			id="embellishment"
			src="../../public/assets/spiral.svg"
		>
	</div>
</template>

<style scoped>
	.bs-card>* {
		grid-column: 1/3;
		text-align: center;
	}

	h1 {
		font-size: 1.6em;
		margin: 0;
	}

	span {
		opacity: 0.7;
	}

	#embellishment {
		background-color: #111;
		box-shadow: 0 0 0.5em #000f;
		height: 4em;
		inset: -1.5em -3em auto auto;
		padding: 0.2em;
		pointer-events: none;
		position: absolute;
		transform: rotate3d(0.5, 0.5, 0.3, -45deg);
		width: 4em;
	}

	.mobile-layout #embellishment,
	#leaderboard-page #embellishment {
		display: none;
	}
</style>
