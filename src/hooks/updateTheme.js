import { watch } from "vue"
import { useStore } from "vuex"

export default function() {
	const store = useStore()

	function setTheme(name) {
		document.body.className = `${name}-theme`
	}

	watch(() => store.state.siteTheme, setTheme)
	setTheme(store.state.siteTheme)
}
