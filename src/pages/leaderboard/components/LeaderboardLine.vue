<template>
	<div :class="['position', colourClass]">
		<span v-if="!groupWPrev">#{{ place }}</span>
	</div>
	<div :class="['family-name', colourClass]">
		<a :href="profileLink" class="bs-link" target="_blank">
			{{ profile.familyName }}
		</a>
		<button @click="removeFromCustom" v-if="$route.name == routeNameEnum.CUSTOM_LEADERBOARD">
			<DeleteOutlined />
		</button>
	</div>
	<div :class="['character-name', colourClass]" :title="featuredCharacter?.class">
		{{ featuredCharacter?.name }}
	</div>
	<div :class="['score', colourClass]">
		<template v-if="score !== -1">
			{{ displayScore || score }}
		</template>
		<LockOutlined v-else />
	</div>
</template>

<script setup>
	import { computed } from "vue"
	import { DeleteOutlined } from "@ant-design/icons-vue"
	import { LockOutlined } from "@ant-design/icons-vue"
	import { routeNameEnum } from "@/router"
	import { useMainStore } from "@/stores"

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

	const profileLink = (
		"https://www.naeu.playblackdesert.com/en-US/Adventure/Profile?" +
		(new URLSearchParams({
			profileTarget: props.profile.profileTarget
		}))
	)

	const backgroundColour = computed(() => {
		return props.place % 2 ? "transparent" : "#0001"
	})

	const fontSize = computed(() => {
		return ["1.3em", "1.2em", "1.1em"][props.colour - 1] || "1em"
	})

	const colourClass = computed(() => {
		return `bs-text-${["red", "orange", "blue"][props.colour - 1] ?? "white"}`
	})

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
			"Maegu",
			"Scholar",
			"Dosa",
			"Deadeye",
		].indexOf(props.featuredCharacter?.class)

		return `-1.98rem ${-((5.5 / 3) * i + 0.3)}rem`
	})
</script>

<style scoped>
	.bs-text-white {
		opacity: 0.9;
	}

	.position,
	.family-name,
	.character-name,
	.score {
		align-items: center;
		background-color: v-bind(backgroundColour);
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
		& a {
			opacity: 1;
		}

		& button {
			background: none;
			border: 0;
			cursor: pointer;
			filter: invert(1);
			font-size: 1rem;
			margin-left: 0.25rem;
			opacity: 0.75;
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
		width: 1.5rem;
	}
</style>
