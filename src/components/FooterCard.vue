<template>
	<div class="bs-card">
		<a :href :key="href" class="bs-link" target="_blank" v-for="{ href, icon, name } of links">
			<component :is="icon" />
			{{ name }}
		</a>
	</div>
</template>

<script lang="ts" setup>
	import { CopyrightCircleOutlined, GithubFilled, MoneyCollectFilled, ToolFilled } from "@ant-design/icons-vue"

	const links = [
		{
			href: "https://www.hemlo.cc/finances",
			icon: MoneyCollectFilled,
			name: "Donate",
		},
		{
			href: "https://github.com/man90es/BDO-Leaderboards",
			icon: GithubFilled,
			name: "GitHub",
		},
		{
			href: "https://github.com/man90es/BDO-REST-API",
			icon: ToolFilled,
			name: "API",
		},
		{
			href: "https://github.com/man90es",
			icon: CopyrightCircleOutlined,
			name: `man90, ${(new Date()).getFullYear()}`,
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
	}
</style>
