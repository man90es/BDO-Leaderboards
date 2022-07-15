import { readonly, ref } from "vue"

function isMobile() {
	return window.innerWidth <= window.innerHeight
}

export default function() {
	const state = ref(isMobile())

	window.onresize = () => state.value = isMobile()

	return readonly(state)
}
