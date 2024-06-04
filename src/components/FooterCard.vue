<template>
	<div class="bs-card">
		<a
			:href
			:key="href"
			:style="{ backgroundImage: icon }"
			class="bs-link"
			target="_blank"
			v-for="{ href, icon, name } of links"
		>
			{{ name }}
		</a>
	</div>
</template>

<script lang="ts" setup>
	const links = [
		{
			href: "https://github.com/man90es/BDO-Leaderboards",
			icon: `url(${process.env.BASE_URL}assets/star_black_24dp.svg)`,
			name: "GitHub",
		},
		{
			href: "https://github.com/man90es/BDO-REST-API",
			icon: `url(${process.env.BASE_URL}assets/construction_black_24dp.svg)`,
			name: "API",
		},
		{
			href: "https://www.hemlo.cc/finances",
			icon: `url(${process.env.BASE_URL}assets/paid_black_24dp.svg)`,
			name: "Donate",
		},
		{
			href: "https://github.com/man90es",
			name: `man90 © ${(new Date()).getFullYear()}`,
		},
	]
</script>

<style scoped>
	.bs-link {
		background-repeat: no-repeat;
		background-size: contain;
		color: #24272d;
		filter: invert(1);
		font-size: 0.9em;
		padding-left: 1.5em;

		&:last-child {
			padding-left: 0;
		}
	}
</style>
