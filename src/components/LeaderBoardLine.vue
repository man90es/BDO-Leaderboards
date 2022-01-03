<template>
	<div :style="cssVars" class="position"><span v-if="!groupWPrev">#{{ place }}</span></div>
	<div :style="cssVars" class="family-name">
		<a :href="profileLink" target="_blank">{{ profile.familyName }}</a>
		<button v-if="$route.name == 'customLeaderboard'" @click="removeFromCustom"><img :src="assets.remove" /></button>
	</div>
	<div :style="cssVars" class="character-name" :class="{ [(featuredCharacter?.class || '').toLowerCase().replace(' ', '-')]: true }" :title="featuredCharacter?.class">{{ featuredCharacter?.name }}</div>
	<div :style="cssVars" class="score">{{ displayScore || score }}</div>
</template>

<script setup>
	const assets = {
		remove: `${process.env.BASE_URL}assets/highlight_off_black_24dp.svg`,
	}
</script>

<script>
	export default {
		inheritAttrs: false,
		props: [
			'profile',
			'featuredCharacter',
			'score',
			'displayScore',
			'place',
			'colour',
			'groupWPrev',
		],
		computed: {
			cssVars() {
				let vars = {
					"background-color": this.place % 2 ? "transparent" : "#0001"
				}

				switch (this.colour) {
					case 1:
						return {
							...vars,
							"color":     "#e06c75",
							"font-size": "1.3em",
						}

					case 2:
						return {
							...vars,
							"color":     "#e5c07b",
							"font-size": "1.2em",
						}

					case 3:
						return {
							...vars,
							"color":     "#61afef",
							"font-size": "1.1em",
						}
				}

				return vars
			},

			profileLink() {
				return `https://www.naeu.playblackdesert.com/en-US/Adventure/Profile?profileTarget=${this.profile.profileTarget}`
			}
		},

		methods: {
			removeFromCustom() {
				this.$store.commit('removeFromCustomList', this.profile.profileTarget)
			}
		}
	}
</script>

<style lang="scss" scoped>
	#leaderboard > * {
		padding: 0.5rem;
	}

	.position, .score {
		text-align: right;
	}

	.family-name {
		a {
			color: inherit;
			text-decoration: none;
		}

		img {
			height: 1rem;
			opacity: 0.75;
		}

		button {
			background: none;
			box-shadow: none;
			font-size: 1rem;
			margin-left: 0.25rem;
			padding: 0;
		}
	}

	.character-name {
		$spritesheet-x-offset: -0.3rem;

		padding-left: 2rem !important;

		&::before {
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
		}

		&.warrior::before {
			background-position: $spritesheet-x-offset -0.3rem !important;
		}

		&.ranger::before {
			background-position: $spritesheet-x-offset -2.0rem !important;
		}

		&.sorceress::before {
			background-position: $spritesheet-x-offset -3.8rem !important;
		}

		&.berserker::before {
			background-position: $spritesheet-x-offset -5.6rem !important;
		}

		&.tamer::before {
			background-position: $spritesheet-x-offset -7.6rem !important;
		}

		&.ninja::before {
			background-position: $spritesheet-x-offset -9.3rem !important;
		}

		&.kunoichi::before {
			background-position: $spritesheet-x-offset -11.2rem !important;
		}

		&.witch::before {
			background-position: $spritesheet-x-offset -13.0rem !important;
		}

		&.wizard::before {
			background-position: $spritesheet-x-offset -14.9rem !important;
		}

		&.maehwa::before {
			background-position: $spritesheet-x-offset -16.6rem !important;
		}

		&.valkyrie::before {
			background-position: $spritesheet-x-offset -18.5rem !important;
		}

		&.musa::before {
			background-position: $spritesheet-x-offset -20.4rem !important;
		}

		&.dark-knight::before {
			background-position: $spritesheet-x-offset -22.1rem !important;
		}

		&.striker::before {
			background-position: $spritesheet-x-offset -24.0rem !important;
		}

		&.mystic::before {
			background-position: $spritesheet-x-offset -25.8rem !important;
		}

		&.lahn::before {
			background-position: $spritesheet-x-offset -27.8rem !important;
		}

		&.archer::before {
			background-position: $spritesheet-x-offset -29.6rem !important;
		}

		&.shai::before {
			background-position: $spritesheet-x-offset -31.3rem !important;
		}

		&.guardian::before {
			background-position: $spritesheet-x-offset -33.1rem !important;
		}

		&.hashashin::before {
			background-position: $spritesheet-x-offset -35.0rem !important;
		}

		&.nova::before {
			background-position: $spritesheet-x-offset -36.8rem !important;
		}

		&.sage::before {
			background-position: $spritesheet-x-offset -38.6rem !important;
		}

		&.corsair::before {
			background-position: $spritesheet-x-offset -40.5rem !important;
		}
	}

	.mobile-layout {
		.character-name::before {
			zoom: 0.7;;
			// background-size: 5.5rem auto;
		}
	}
</style>
