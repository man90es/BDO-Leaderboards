<template>
	<RouterView />
</template>

<script lang="ts" setup>
	import useUpdateTheme from "@/hooks/updateTheme.js"

	useUpdateTheme()
</script>
