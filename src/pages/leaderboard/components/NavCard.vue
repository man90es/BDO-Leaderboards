<template>
	<ContentCard>
		<h2 id="guild-link">
			<a :href="guildLink" target="_blank" v-if="route.name !== routeNameEnum.CUSTOM_LEADERBOARD">
				Guild: {{ guildName ?? route.params.guildName }}
			</a>
			<span v-else>Custom Leaderboard</span>
		</h2>
		<RouterLink to="/" class="select-guild-link">
			Select another
		</RouterLink>
		<RouterLink to="./level">Character Level</RouterLink>
		<RouterLink to="./contribution">Contribution Points</RouterLink>
		<RouterLink to="./gathering">Gathering</RouterLink>
		<RouterLink to="./fishing">Fishing</RouterLink>
		<RouterLink to="./hunting">Hunting</RouterLink>
		<RouterLink to="./cooking">Cooking</RouterLink>
		<RouterLink to="./alchemy">Alchemy</RouterLink>
		<RouterLink to="./processing">Processing</RouterLink>
		<RouterLink to="./training">Training</RouterLink>
		<RouterLink to="./trading">Trading</RouterLink>
		<RouterLink to="./farming">Farming</RouterLink>
		<RouterLink to="./sailing">Sailing</RouterLink>
		<RouterLink to="./barter">Barter</RouterLink>
		<RouterLink to="./combat">Combat Fame</RouterLink>
		<RouterLink to="./life">Life Fame</RouterLink>
		<RouterLink to="./characters">Family Size</RouterLink>
		<RouterLink to="./age">Account Age</RouterLink>
	</ContentCard>
</template>

<script setup lang="ts">
	import { computed } from "vue"
	import { ContentCard } from "@/components"
	import { routeNameEnum } from "@/router"
	import { supportedServers } from "@/data"
	import { useRoute } from "vue-router"

	const props = defineProps<{ guildName: string }>()
	const route = useRoute()

	const guildLink = computed(() => {
		const server = [...supportedServers.values()]
			.find(s => route.params.region === s.domain)

		// This normally shouldn't happen
		if (!server) {
			return undefined
		}

		const guildName = props.guildName ?? route.params.guildName
		return server.getGuildLink(Array.isArray(guildName) ? guildName[0] : guildName)
	})
</script>

<style scoped>
	#guild-link {
		grid-column: 1/3;
		margin: 0;
		text-align: center;

		a {
			opacity: 1;
		}
	}

	.select-guild-link {
		grid-column: 1/3;
		margin-bottom: 1em;
		text-align: center;
	}

	a {
		opacity: 0.7;
		text-decoration: none;

		&:hover {
			opacity: 1;
		}

		&.router-link-exact-active {
			opacity: 1;
		}
	}
</style>
