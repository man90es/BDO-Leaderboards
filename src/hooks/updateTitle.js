import { watch } from "vue"
import { useRoute } from "vue-router"

import { capitalise } from "../utils"

export default function() {
	const route = useRoute()

	function switchTitle(guildName, discipline) {
		// Convert internal names to conventional
		switch (discipline) {
			case "contribution":
				discipline = "CP"
				break

			case "combat":
				discipline = "Combat Fame"
				break

			case "life":
				discipline = "Life Fame"
				break

			case undefined:
				document.title = "BDO Leaderboards"
				return
		}

		// Set a new title
		document.title = `${guildName || "Custom"} ${capitalise(discipline)} Leaderboard`
	}

	watch(() => route.params, ({ guildName, discipline }) => {
		switchTitle(guildName, discipline)
	})
}
