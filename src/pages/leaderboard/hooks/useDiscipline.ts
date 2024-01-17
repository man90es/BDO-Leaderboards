import { computed, readonly } from "vue"
import { useRoute } from "vue-router"

export default function useDiscipline() {
	const route = useRoute()

	return readonly(computed(() => {
		return Array.isArray(route.params.discipline)
			? route.params.discipline[0]
			: route.params.discipline
	}))
}
