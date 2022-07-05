import { readonly, ref } from "vue"

export default function() {
	const state = ref(false)

	window.onresize = () => {
		if (state.value !== innerWidth <= innerHeight) {
			state.value = !state.value
		}
	}

	return readonly(state)
}
