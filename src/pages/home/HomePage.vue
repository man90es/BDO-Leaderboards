<template>
	<main :class="{ 'mobile-layout': isMobile }">
		<HeaderCard />
		<SearchCard />
		<SearchHistoryCard />
		<FooterCard />
	</main>
</template>

<script lang="ts" setup>
	import { FooterCard, HeaderCard } from "@/components"
	import { SearchCard, SearchHistoryCard } from "./components"
	import { siteName } from "@/data"
	import { useHead } from "@vueuse/head"
	import { useIsMobile } from "@/hooks"

	const isMobile = useIsMobile()
	useHead({ title: siteName })
</script>

<style scoped>
	main {
		align-items: center;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		justify-content: center;
		min-height: 100vh;

		&>* {
			box-sizing: border-box;
			width: 25vw;
		}

		&.mobile-layout {
			justify-content: flex-start;
			margin-top: 0.5rem;

			.bs-card {
				width: calc(100vw - 1rem);
			}
		}
	}
</style>
