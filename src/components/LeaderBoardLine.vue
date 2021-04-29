<template>
	<div :style="cssVars" class="position" :class="{ header }"><span v-if="!hidePlace">#{{ place }}</span></div>
	<div :style="cssVars" class="family-name" :class="{ header }">{{ familyName }}</div>
	<div :style="cssVars" class="character-name" :class="{ header, [(characterClass || '').toLowerCase().replace(' ', '-')]: true }" :title="characterClass">{{ characterName }}</div>
	<div :style="cssVars" class="score" :class="{ header }">{{ score }}</div>
</template>

<script>
	export default {
		name: 'LeaderBoardLine',
		props: ['place', 'colour', 'familyName', 'characterClass', 'characterName', 'score', 'hidePlace', 'header'],
		computed: {
			cssVars() {
				switch (this.colour) {
					case 1:
						return {
							'color': '#c86783',
							'font-size': '1.6em'
						}

					case 2:
						return {
							'color': '#c1e277',
							'font-size': '1.4em',
							'background-color': '#0001'
						}

					case 3:
						return {
							'color': '#448fc8',
							'font-size': '1.2em'
						}

					default:
						return {
							'background-color': this.place % 2 ? 'transparent' : '#0001'
						}
				}
			}
		}
	}
</script>

<style>
	.position,
	.score {
		text-align: right;
	}

	.header {
		font-weight: bold;
	}

	.character-name:not(.header)::before {
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
		background-position: var(--spritesheet-x-offset) -16.6rem !important;
	}

	.valkyrie::before {
		background-position: var(--spritesheet-x-offset) -18.5rem !important;
	}

	.musa::before {
		background-position: var(--spritesheet-x-offset) -20.4rem !important;
	}

	.dark-knight::before {
		background-position: var(--spritesheet-x-offset) -22.1rem !important;
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

	.sage::before {
		background-position: var(--spritesheet-x-offset) -38.6rem !important;
	}
</style>
