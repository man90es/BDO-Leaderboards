import { useMainStore } from "@/stores/main"

export default function() {
	const store = useMainStore()

	function setTheme(name) {
		document.body.className = `${name}-theme`
	}

	store.$subscribe((mutation) => {
		if ("siteTheme" === mutation.events.key) {
			setTheme(mutation.events.newValue)
		}
	})

	setTheme(store.siteTheme)
}
