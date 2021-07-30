import { Participant } from "./models"
import { getNumericSpec } from "./utils"

const PRIVATE_LEVEL   = 0b1
const PRIVATE_CONTRIB = 0b100
const PRIVATE_SPECS   = 0b1000

export function generateLeaderboardHeaders(discipline) {
	const firstCols = ["#", "Family Name"]

	switch (discipline) {
		case "contribution": return [...firstCols, null, "CP"]
		case "level":        return [...firstCols, "Character", "Level"]
		case "combat":       return [...firstCols, null, "Combat Fame"]
		case "life":         return [...firstCols, null, "Life Fame"]
		default:             return [...firstCols, "Character", "Rank"]
	}
}

export function generateLeaderboard(members, discipline) {
	return members
		.map((member) => {
			if (
				(member.privacy & PRIVATE_CONTRIB && ["contribution"].includes(discipline)) ||
				(member.privacy & PRIVATE_LEVEL && ["level", "combat"].includes(discipline)) ||
				(member.privacy & PRIVATE_SPECS && !["contribution", "level", "combat"].includes(discipline))
			) {
				return new Participant(member, null, -1, "Private")
			}

			switch (discipline) {
				case "contribution": {
					return new Participant(member, null, member.contributionPoints)
				}

				case "level": {
					let memberRep = member.characters
						.sort((characterA, characterB) => { // Choose member"s character with the highest level
							return characterA.level > characterB.level ? -1 : 1
						})[0]

					return new Participant(member, memberRep, memberRep.level)
				}

				case "combat": {
					let combatFame = member.characters
						.reduce((fame, character) => {
							if (character.level < 56) {
								return fame + character.level
							} else if (character.level < 60) {
								return fame + character.level * 2
							} else {
								return fame + character.level * 5
							}
						}, 1)

					return new Participant(member, null, combatFame)
				}

				case "life": {
					let lifeFame = member.characters
						.reduce((fame, character) => {
							return fame + Object.values(character.specLevels).reduce((cFame, specLevel) => {
								const numericSpec = getNumericSpec(specLevel)
								return cFame + (numericSpec > 30 ? numericSpec / 2 : 0) + (numericSpec > 80 ? numericSpec : 0)
							}, 0)
						}, 1)

					return new Participant(member, null, Math.floor(lifeFame))
				}

				default: {
					let memberRep = member.characters
						.sort((a, b) => { // Choose member"s rep with the highest spec level
							return getNumericSpec(a.specLevels[discipline]) > getNumericSpec(b.specLevels[discipline]) ? -1 : 1
						})[0]

					return new Participant(member, memberRep, getNumericSpec(memberRep.specLevels[discipline]), memberRep.specLevels[discipline])
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
