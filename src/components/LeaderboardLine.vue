<template>
	<div :style="cssVars" class="position"><span v-if="!groupWPrev">#{{ place }}</span></div>
	<div :style="cssVars" class="family-name">
		<a :href="profileLink" target="_blank">{{ profile.familyName }}</a>
		<button v-if="$route.name == 'customLeaderboard'" @click="removeFromCustom">
			<img :src="assets.remove" alt="x" />
		</button>
	</div>
	<div :style="cssVars" class="character-name" :class="{ [classClass]: true }" :title="featuredCharacter?.class">
		{{ featuredCharacter?.name }}
	</div>
	<div :style="cssVars" class="score">{{ displayScore || score }}</div>
</template>

<script setup>
	import { computed } from "vue"
	import { useMainStore } from "@/stores/main"

	const assets = {
		remove: `${process.env.BASE_URL}assets/highlight_off_black_24dp.svg`,
	}

	const store = useMainStore()
	const props = defineProps({
		profile: {
			type: Object,
			required: true,
		},
		featuredCharacter: {
			type: Object,
		},
		score: {
			type: Number,
			required: true,
		},
		displayScore: {
			type: String,
		},
		place: {
			type: Number,
			required: true,
		},
		colour: {
			type: Number,
			required: true,
		},
		groupWPrev: {
			type: Boolean,
			default: false,
		},
		refreshLeaderboard: {
			type: Function,
			required: true,
		}
	})

	const cssVars = computed(() => {
		const documentStyle = window.getComputedStyle(document.body)
		const vars = {
			backgroundColor: props.place % 2 ? "transparent" : "#0001"
		}

		return ({
			1: {
				...vars,
				color: documentStyle.getPropertyValue("--colour-red"),
				fontSize: "1.3em",
			},
			2: {
				...vars,
				color: documentStyle.getPropertyValue("--colour-orange"),
				fontSize: "1.2em",
			},
			3: {
				...vars,
				color: documentStyle.getPropertyValue("--colour-blue"),
				fontSize: "1.1em",
			}
		})[props.colour] || vars
	})

	const profileLink = computed(() => (
		`https://www.naeu.playblackdesert.com/en-US/Adventure/Profile?profileTarget=${props.profile.profileTarget}`
	))

	const classClass = computed(() => (
		(props.featuredCharacter?.class || "").toLowerCase().replace(" ", "-")
	))

	function removeFromCustom() {
		store.removeFromCustomList(props.profile.profileTarget, props.profile.region)
		props.refreshLeaderboard()
	}
</script>

<style lang="scss" scoped>
	#leaderboard > * {
		padding: 0.5rem;
		line-height: 1.2rem;
		display: flex;
		align-items: center;
	}

	.position, .score {
		justify-content: end;
	}

	.family-name {
		a {
			opacity: 1;
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
		&::before {
			content: '';
			width: 1.5rem;
			height: 1.5rem;
			background-image: url(https://s1.pearlcdn.com/NAEU/contents/img/common/character/icn_class_symbol_spr.svg);
			background-position: 10rem 10rem;
			background-repeat: no-repeat;
			background-size: 5.5rem auto;
			margin-right: 0.25rem;
			opacity: 0.8;
		}

		&.warrior::before {
			background-position: var(--class-icon-spritesheet-x-offset) -0.15rem !important;
		}

		&.ranger::before {
			background-position: var(--class-icon-spritesheet-x-offset) -1.98rem !important;
		}

		&.sorceress::before {
			background-position: var(--class-icon-spritesheet-x-offset) -3.82rem !important;
		}

		&.berserker::before {
			background-position: var(--class-icon-spritesheet-x-offset) -5.65rem !important;
		}

		&.tamer::before {
			background-position: var(--class-icon-spritesheet-x-offset) -7.48rem !important;
		}

		&.ninja::before {
			background-position: var(--class-icon-spritesheet-x-offset) -9.32rem !important;
		}

		&.kunoichi::before {
			background-position: var(--class-icon-spritesheet-x-offset) -11.15rem !important;
		}

		&.witch::before {
			background-position: var(--class-icon-spritesheet-x-offset) -12.98rem !important;
		}

		&.wizard::before {
			background-position: var(--class-icon-spritesheet-x-offset) -14.82rem !important;
		}

		&.maehwa::before {
			background-position: var(--class-icon-spritesheet-x-offset) -16.65rem !important;
		}

		&.valkyrie::before {
			background-position: var(--class-icon-spritesheet-x-offset) -18.48rem !important;
		}

		&.musa::before {
			background-position: var(--class-icon-spritesheet-x-offset) -20.32rem !important;
		}

		&.dark-knight::before {
			background-position: var(--class-icon-spritesheet-x-offset) -22.15rem !important;
		}

		&.striker::before {
			background-position: var(--class-icon-spritesheet-x-offset) -23.98rem !important;
		}

		&.mystic::before {
			background-position: var(--class-icon-spritesheet-x-offset) -25.82rem !important;
		}

		&.lahn::before {
			background-position: var(--class-icon-spritesheet-x-offset) -27.65rem !important;
		}

		&.archer::before {
			background-position: var(--class-icon-spritesheet-x-offset) -29.48rem !important;
		}

		&.shai::before {
			background-position: var(--class-icon-spritesheet-x-offset) -31.32rem !important;
		}

		&.guardian::before {
			background-position: var(--class-icon-spritesheet-x-offset) -33.15rem !important;
		}

		&.hashashin::before {
			background-position: var(--class-icon-spritesheet-x-offset) -34.98rem !important;
		}

		&.nova::before {
			background-position: var(--class-icon-spritesheet-x-offset) -36.82rem !important;
		}

		&.sage::before {
			background-position: var(--class-icon-spritesheet-x-offset) -38.65rem !important;
		}

		&.corsair::before {
			background-position: var(--class-icon-spritesheet-x-offset) -40.48rem !important;
		}

		&.drakania::before {
			background-position: var(--class-icon-spritesheet-x-offset) -42.31rem !important;
		}

		/*
			The formula for y offset is 5.5 / 3 * 24 + 0.15
			Where
				5.5 is x from background-size property
				3 is the number of horisontal images in the spritesheet
				24 is the index of a character
				0.15 is just a static offset
			I should really try to automate this, but passing data from vue to css is a pain
			Especially to ::before
		*/
	}

	.mobile-layout {
		.character-name::before {
			zoom: 0.7;
		}
	}
</style>
