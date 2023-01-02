<template>
	<div class="position">
		<span v-if="!groupWPrev">#{{ place }}</span>
	</div>
	<div class="family-name">
		<a :href="profileLink" target="_blank">{{ profile.familyName }}</a>
		<button
			@click="removeFromCustom"
			v-if="$route.name == 'customLeaderboard'"
		>
			<img :src="xIcon" alt="x" />
		</button>
	</div>
	<div :title="featuredCharacter?.class" class="character-name">
		{{ featuredCharacter?.name }}
	</div>
	<div class="score">{{ displayScore || score }}</div>
</template>

<script setup>
	import { computed } from "vue"
	import { useMainStore } from "@/stores/main"

	const xIcon = process.env.BASE_URL + "assets/highlight_off_black_24dp.svg"

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
		},
	})

	function removeFromCustom() {
		store.removeFromCustomList(
			props.profile.profileTarget,
			props.profile.region
		)
		props.refreshLeaderboard()
	}

	const profileLink =
		"https://www.naeu.playblackdesert.com/en-US/Adventure/Profile?profileTarget=" +
		props.profile.profileTarget

	const backgroundColour = computed(() =>
		props.place % 2 ? "transparent" : "#0001"
	)

	const fontSize = computed(
		() => ["1.3em", "1.2em", "1.1em"][props.colour - 1] || "1em"
	)

	const colour = computed(
		() =>
			`var(--colour-${
				["red", "orange", "blue"][props.colour - 1] || "default"
			})`
	)

	const iconOffset = computed(() => {
		const i = [
			"Warrior",
			"Ranger",
			"Sorceress",
			"Berserker",
			"Tamer",
			"Ninja",
			"Kunoichi",
			"Witch",
			"Wizard",
			"Maehwa",
			"Valkyrie",
			"Musa",
			"Dark Knight",
			"Striker",
			"Mystic",
			"Lahn",
			"Archer",
			"Shai",
			"Guardian",
			"Hashashin",
			"Nova",
			"Sage",
			"Corsair",
			"Drakania",
			"Woosa",
		].indexOf(props.featuredCharacter?.class)

		return [
			"dark" === store.siteTheme ? "-1.98rem" : "-0.15rem",
			-((5.5 / 3) * i + 0.3) + "rem",
		].join(" ")
	})
</script>

<style lang="scss" scoped>
	#leaderboard > * {
		align-items: center;
		background-color: v-bind(backgroundColour);
		color: v-bind(colour);
		display: flex;
		font-size: v-bind(fontSize);
		line-height: 1.2rem;
		padding: 0.5rem;
	}

	.position,
	.score {
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

	.character-name::before {
		background-image: url(https://s1.pearlcdn.com/NAEU/contents/img/common/character/icn_class_symbol_spr.svg);
		background-position: v-bind(iconOffset);
		background-repeat: no-repeat;
		background-size: 5.5rem auto;
		content: "";
		height: 1.5rem;
		margin-right: 0.25rem;
		opacity: 0.8;
		width: 1.5rem;
	}

	.mobile-layout .character-name::before {
		zoom: 0.7;
	}
</style>
