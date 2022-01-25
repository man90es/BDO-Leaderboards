import { watch } from "vue"
import { useRoute } from "vue-router"

import { capitalise } from "../utils"

export default function() {
	const route = useRoute()
	const siteTitle = "Black Desert Online Leaderboards"

	function switchTitle(guildName, discipline) {
		// Convert internal names to conventional
		switch (discipline) {
			case "contribution":
				discipline = "CP"
				break

			case "combat":
				discipline = "Combat fame"
				break

			case "life":
				discipline = "Life fame"
				break

			case "age":
				discipline = "Account age"
				break

			case "characters":
				discipline = "Number of characters"
				break

			case undefined:
				document.title = siteTitle
				return
		}

		// Set a new title
		document.title = `${guildName || "Custom"} ranking: ${capitalise(discipline)} — ${siteTitle}`
	}

	watch(() => route.params, ({ guildName, discipline }) => {
		switchTitle(guildName, discipline)
	})
}
