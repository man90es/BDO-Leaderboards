<template>
	<div class="leader-board-line" :class="{ numbaOne: colour == 1, numbaTwo: colour == 2, numbaThree: colour == 3 }">
		<div><span v-if="!hidePlace">#{{ place }}</span></div>
		<div>{{ familyName }}</div>
		<div>{{ characterName }}</div>
		<div>{{ score }}</div>
	</div>
</template>

<script>
	export default {
		name: 'LeaderBoardLine',
		props: ['place', 'colour', 'familyName', 'characterName', 'score', 'hidePlace']
	}
</script>

<style>
	.leader-board-line {
		display: flex;
		gap: 1rem;
		padding: 0.5rem;
	}

	.leader-board-line > div {
		width: 20rem;
		text-align: left;
	}

	.leader-board-line > div:first-child {
		width: 3rem;
		text-align: right;
	}

	.leader-board-line > div:last-child {
		text-align: right;
	}

	.leader-board-line:nth-child(odd){
		background-color: #0001;
	}

	.leader-board-line:nth-child(1) {
		font-weight: bold;
	}

	.leader-board-line.numbaOne {
		color: #c86783;
		font-size: 1.6rem;
	}

	.leader-board-line.numbaTwo {
		color: #c1e277;
		font-size: 1.4rem;
	}

	.leader-board-line.numbaThree {
		color: #448fc8;
		font-size: 1.2rem;
	}
</style>
