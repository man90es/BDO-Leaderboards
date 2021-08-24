import { useStore } from "vuex"

export default function() {
	const store = useStore()

	window.onresize = () => {
		if (store.state.mobile && innerWidth > innerHeight) {
			store.commit("setMobile", false)
		} else if (!store.state.mobile && innerWidth < innerHeight) {
			store.commit("setMobile", true)
		}
	}
}
