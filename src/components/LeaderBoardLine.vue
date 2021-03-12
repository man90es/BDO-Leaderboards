<template>
	<div class="leader-board-line" :class="{ 'numba-one': colour == 1, 'numba-two': colour == 2, 'numba-three': colour == 3 }">
		<div><span v-if="!hidePlace">#{{ place }}</span></div>
		<div>{{ familyName }}</div>
		<div :title="characterClass" :class="{ [(characterClass || '').toLowerCase().replace(' ', '-')]: true }">{{ characterName }}</div>
		<div>{{ score }}</div>
	</div>
</template>

<script>
	export default {
		name: 'LeaderBoardLine',
		props: ['place', 'colour', 'familyName', 'characterClass', 'characterName', 'score', 'hidePlace']
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
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.leader-board-line > div:first-child {
		width: 4rem;
		text-align: right;
	}

	.leader-board-line > div:last-child {
		text-align: right;
		width: 15.5rem
	}

	.leader-board-line:nth-child(odd) {
		background-color: #0001;
	}

	.leader-board-line:nth-child(1) {
		font-weight: bold;
	}

	.leader-board-line.numba-one {
		color: #c86783;
		font-size: 1.6em;
	}

	.leader-board-line.numba-two {
		color: #c1e277;
		font-size: 1.4em;
	}

	.leader-board-line.numba-three {
		color: #448fc8;
		font-size: 1.2em;
	}

	.mobile-layout .leader-board-line {
		font-size: 0.9em;
	}

	.leader-board-line > div:nth-child(3) {
		margin-left: 0.75rem;
	}

	.leader-board-line > div:nth-child(3)::before {
		content: '';
		width: 1.5rem;
		height: 1.5rem;
		background-image: url(https://s1.pearlcdn.com/NAEU/contents/img/common/character/icn_class_symbol_spr.svg);
		background-position: 10em 10em;
		background-repeat: no-repeat;
		background-size: 5.5rem auto;
		transform: translate(-1.5rem, 0);
		position: absolute;
		opacity: 0.8;

		--spritesheet-x-offset: -2.1rem;
	}

	.warrior::before {
		background-position: var(--spritesheet-x-offset) -0.3rem !important;
	}

	.ranger::before {
		background-position: var(--spritesheet-x-offset) -2.0rem !important;
	}

	.sorceress::before {
		background-position: var(--spritesheet-x-offset) -3.8rem !important;
	}

	.berserker::before {
		background-position: var(--spritesheet-x-offset) -5.6rem !important;
	}

	.tamer::before {
		background-position: var(--spritesheet-x-offset) -7.6rem !important;
	}

	.ninja::before {
		background-position: var(--spritesheet-x-offset) -9.3rem !important;
	}

	.kunoichi::before {
		background-position: var(--spritesheet-x-offset) -11.2rem !important;
	}

	.witch::before {
		background-position: var(--spritesheet-x-offset) -13.0rem !important;
	}

	.wizard::before {
		background-position: var(--spritesheet-x-offset) -14.9rem !important;
	}

	.maehwa::before {
		background-position: var(--spritesheet-x-offset) -16.7rem !important;
	}

	.valkyrie::before {
		background-position: var(--spritesheet-x-offset) -18.5rem !important;
	}

	.musa::before {
		background-position: var(--spritesheet-x-offset) -20.4rem !important;
	}

	.dark-knight::before {
		background-position: var(--spritesheet-x-offset) -22.2rem !important;
	}

	.striker::before {
		background-position: var(--spritesheet-x-offset) -24.0rem !important;
	}

	.mystic::before {
		background-position: var(--spritesheet-x-offset) -25.8rem !important;
	}

	.lahn::before {
		background-position: var(--spritesheet-x-offset) -27.8rem !important;
	}

	.archer::before {
		background-position: var(--spritesheet-x-offset) -29.6rem !important;
	}

	.shai::before {
		background-position: var(--spritesheet-x-offset) -31.3rem !important;
	}

	.guardian::before {
		background-position: var(--spritesheet-x-offset) -33.1rem !important;
	}

	.hashashin::before {
		background-position: var(--spritesheet-x-offset) -35.0rem !important;
	}

	.nova::before {
		background-position: var(--spritesheet-x-offset) -36.8rem !important;
	}
</style>
