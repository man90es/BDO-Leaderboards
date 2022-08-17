import { useMainStore } from "@/stores/main"

export default function() {
	const store = useMainStore()

	function setTheme(name) {
		document.body.className = `${name}-theme`
	}

	store.$subscribe((mutation) => {
		if (undefined !== mutation.payload?.siteTheme) {
			setTheme(mutation.payload.siteTheme)
		}
	})

	setTheme(store.siteTheme)
}
