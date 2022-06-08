<template>
	<router-view/>
</template>

<script setup>
	import useUpdateMobile from "./hooks/updateMobile.js"
	import useUpdateTheme from "./hooks/updateTheme.js"

	useUpdateMobile()
	useUpdateTheme()
</script>
