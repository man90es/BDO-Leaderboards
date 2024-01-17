import { RegionEnum } from "@/data"
import { routeNameEnum } from "@/router"
import { useRouter } from "vue-router"

export default function useNavigation() {
	const router = useRouter()

	function navigateToCustomLeaderboard() {
		router.push({
			name: routeNameEnum.CUSTOM_LEADERBOARD,
			params: { discipline: "level" }
		})
	}

	function navigateToGuildLeaderboard(region: RegionEnum, guildName: string) {
		router.push({
			name: routeNameEnum.LEADERBOARD,
			params: {
				discipline: "level",
				guildName,
				region,
			}
		})
	}

	return {
		navigateToCustomLeaderboard,
		navigateToGuildLeaderboard,
	}
}
