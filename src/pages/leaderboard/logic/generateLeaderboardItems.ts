import { getNumericSpec } from "./getNumericSpec"
import { PrivacyLevelEnum } from "@/data"
import type { Player } from "@/types"

class Participant {
	public colour: number
	public groupWPrev: boolean
	public place: number

	constructor(
		public profile: any,
		public featuredCharacter: any,
		public score: number,
		public displayScore: string
	) {
		this.colour = 0
		this.groupWPrev = false
		this.place = 1
	}
}

export default function generateLeaderboardItems(discipline: string, players: Player[]): Participant[] {
	return players.map((member) => {
		if (
			(member.privacy & PrivacyLevelEnum.CONTRIB && ["contribution"].includes(discipline)) ||
			(member.privacy & PrivacyLevelEnum.LEVEL && ["level", "combat"].includes(discipline)) ||
			(member.privacy & PrivacyLevelEnum.SPECS && !["contribution", "level", "combat", "characters", "age"].includes(discipline))
		) {
			return new Participant(member, null, -1, "Private")
		}

		switch (discipline) {
			case "contribution": {
				return new Participant(member, null, member.contributionPoints || 0, "")
			}

			case "characters": {
				return new Participant(member, null, member.characters.length, "")
			}

			case "age": {
				const age = (+new Date() - +new Date(member.createdOn))
				const months = Math.floor(age / 2.628e9)
				let shouldPluralise = true

				if (months === 0) {
					return new Participant(member, null, months, "<1 month")
				}

				if (`${months}`.charAt(-1) === "1" && months !== 11) {
					shouldPluralise = false
				}

				return new Participant(member, null, months, `${months} month${shouldPluralise ? "s" : ""}`)
			}

			case "level": {
				const memberRep = [...member.characters]
					.sort((characterA, characterB) => (
						// Choose member's character with the highest level
						characterA.level > characterB.level ? -1 : 1
					))[0]

				return new Participant(member, memberRep, memberRep.level, "")
			}

			case "combat": {
				return new Participant(member, null, member.combatFame, "")
			}

			case "life": {
				return new Participant(member, null, member.lifeFame, "")
			}

			default: {
				return new Participant(member, null, getNumericSpec(member.specLevels[discipline]), member.specLevels[discipline])
			}
		}

	})
		.sort((a, b) => a.score > b.score ? -1 : 1) // Order by score
		.map((participant, index, self) => { // Assign places
			const prev = self[index - 1]

			if (prev === undefined) {
				return Object.assign(participant, { place: 1, colour: 1 })
			} else {
				participant.place = prev.place + 1

				return prev.score === participant.score
					? Object.assign(participant, { groupWPrev: true, colour: prev.colour })
					: Object.assign(participant, { colour: prev.colour + 1 })
			}
		})
}
