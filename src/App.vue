<template>
	<router-view/>
</template>

<script setup>
	import useUpdateTitle from "./hooks/updateTitle.js"
	import useUpdateMobile from "./hooks/updateMobile.js"
	import useUpdateTheme from "./hooks/updateTheme.js"

	useUpdateMobile()
	useUpdateTitle()
	useUpdateTheme()
</script>
