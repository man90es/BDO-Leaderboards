<template>
	<header>
		<h1>BDO Leaderboards</h1>
		<span>Search for Black Desert Online leaderboards.</span>
	</header>

	<form class="home-page-form" :class="{ 'mobile-layout': $store.state.mobile }" @submit="navigateToLeaderboard">
		<RegionSelect v-model="region" />
		<FormattedInput placeholder="Guild name" v-model="guildName" />
		<button data-nosnippet>↩</button>
	</form>

	<router-link to="/custom/level" id="custom-leaderboard-link">Custom leaderboard<span>New!</span></router-link>

	<footer data-nosnippet>
		<a href="https://github.com/octoman90/BDO-Leaderboards/issues" target="_blank">Contact</a>
		<a href="https://github.com/octoman90/BDO-Leaderboards" target="_blank">GitHub</a>
		<a href="https://github.com/octoman90/BDO-REST-API" target="_blank">API</a>
	</footer>
</template>

<script setup>
	import { ref } from "vue"
	import { useRouter } from "vue-router"

	import RegionSelect from "../components/RegionSelect.vue"
	import FormattedInput from "../components/FormattedInput.vue"

	const router = useRouter()

	const region = ref("EU")
	const guildName = ref("")

	function navigateToLeaderboard(event) {
		event.preventDefault()
		router.push({ name: "leaderboard", params: { region: region.value, guildName: guildName.value, discipline: "level" } })
	}
</script>

<style lang="scss">
	.home-page-form {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 2rem;

		&.mobile-layout {
			flex-direction: column;
		}

		button {
			background-color: #fff;
			font-size: 1.5em;
			display: flex;
			align-items: center;

			&:active {
				background-color: #aaf1;
			}
		}
	}

	button {
		font-size: 1.25rem;
		padding: 1rem;
		border-radius: 0.5rem;
		border: 0;
		height: 3rem;
	}

	button {
		cursor: pointer;
	}

	#custom-leaderboard-link {
		color: inherit;
		font-size: 1.2em;
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}

		span {
			margin-left: 0.5em;
			color: red;
			vertical-align: super;
			font-size: 0.8em;
		}
	}

	header, footer {
		position: fixed;
	}

	header {
		top: 0;
		text-align: center;
		margin: 0 1em;

		span {
			opacity: 0.7;
		}
	}

	footer {
		bottom: 0;
		width: 100vw;
		display: flex;
		justify-content: flex-end;
		padding: 2em;
		gap: 1em;

		a {
			color: #bbc;
			text-decoration: none;
			border-bottom: 1px solid #bbc;
		}
	}

	.mobile-layout footer {
		font-size: 0.75em;
	}
</style>
