<template>
	<router-view/>
</template>

<script setup>
	import useUpdateTheme from "./hooks/updateTheme.js"

	useUpdateTheme()
</script>
