<template>
	<div class="leader-board-line" :class="{ numbaOne: colour == 1, numbaTwo: colour == 2, numbaThree: colour == 3}">
		<div><span v-if="!hidePlace">#{{ place }}</span></div>
		<div>{{ familyName }}</div>
		<div><img v-if="characterClass" :src="classIconSrc" class="class-icon" :title="characterClass" />{{ characterName }}</div>
		<div>{{ score }}</div>
	</div>
</template>

<script>
	export default {
		name: 'LeaderBoardLine',
		props: ['place', 'colour', 'familyName', 'characterClass', 'characterName', 'score', 'hidePlace'],
		computed: {
			classIconSrc() {
				let images = require.context('../assets/classIcons', false, /\.png$/)
				return images(`./${this.characterClass.toLowerCase().replace(' ', '_')}.png`)
			}
		}
	}
</script>

<style>
	.leader-board-line {
		display: flex;
		gap: 1rem;
		padding: 0.5rem;
		line-height: 1.6rem;
	}

	.leader-board-line > div {
		width: 15rem;
		text-align: left;
	}

	.leader-board-line > div:first-child {
		width: 4rem;
		text-align: right;
	}

	.leader-board-line > div:last-child {
		text-align: right;
	}

	.leader-board-line:nth-child(odd) {
		background-color: #0001;
	}

	.leader-board-line:nth-child(1) {
		font-weight: bold;
	}

	.leader-board-line.numbaOne {
		color: #c86783;
		font-size: 1.6em;
	}

	.leader-board-line.numbaTwo {
		color: #c1e277;
		font-size: 1.4em;
	}

	.leader-board-line.numbaThree {
		color: #448fc8;
		font-size: 1.2em;
	}

	.mobile-layout .leader-board-line {
		font-size: 0.9em;
	}

	.class-icon {
		width: 1.3rem;
		vertical-align: middle;
		margin-right: 0.5rem;
	}

	.mobile-layout .class-icon {
		display: none;
	}
</style>
