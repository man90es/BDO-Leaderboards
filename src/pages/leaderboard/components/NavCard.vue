<template>
	<div class="bs-card">
		<h2 id="guild-link">
			<a
				:href="guildLink"
				class="bs-link"
				target="_blank"
				v-if="route.name !== routeNameEnum.CUSTOM_LEADERBOARD"
			>
				Guild: {{ guildName ?? route.params.guildName }}
			</a>
			<span v-else>Custom Leaderboard</span>
		</h2>
		<RouterLink
			to="/"
			class="bs-link select-guild-link"
		>
			Select another
		</RouterLink>
		<RouterLink
			:key
			:to="`./${key}`"
			class="bs-link"
			v-for="{ key, label } of disciplines"
		>
			{{ label }}
		</RouterLink>
	</div>
</template>

<script setup lang="ts">
	import { computed } from "vue"
	import { disciplines } from "@/constants"
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
		font-size: 1.4em;
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

	.router-link-exact-active {
		opacity: 1;
	}
</style>
