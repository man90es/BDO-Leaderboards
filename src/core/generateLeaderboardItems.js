class Participant {
	constructor(profile, featuredCharacter, score, displayScore) {
		this.colour = 0
		this.displayScore = displayScore
		this.featuredCharacter = featuredCharacter
		this.groupWPrev = false
		this.place = 1
		this.profile = profile
		this.score = score
	}
}

const PRIVATE_LEVEL = 0b1
const PRIVATE_CONTRIB = 0b100
const PRIVATE_SPECS = 0b1000

function getNumericSpec(specText) {
	const parts = specText.split(" ")
	const offset = {
		"Beginner": 0,
		"Apprentice": 10,
		"Skilled": 20,
		"Professional": 30,
		"Artisan": 40,
		"Master": 50,
		"Guru": 80,
	}[parts[0]]

	return offset + parseInt(parts[1])
}

export default function(discipline, players) {
	return players
		.map((member) => {
			if (
				(member.privacy & PRIVATE_CONTRIB && ["contribution"].includes(discipline)) ||
				(member.privacy & PRIVATE_LEVEL && ["level", "combat"].includes(discipline)) ||
				(member.privacy & PRIVATE_SPECS && !["contribution", "level", "combat", "characters", "age"].includes(discipline))
			) {
				return new Participant(member, null, -1, "Private")
			}

			switch (discipline) {
				case "contribution": {
					return new Participant(member, null, member.contributionPoints || 0)
				}

				case "characters": {
					return new Participant(member, null, member.characters.length)
				}

				case "age": {
					const age = (+new Date() - +new Date(member.createdOn))
					const months = Math.floor(age / 2.628e9)
					let shouldPluralise = true

					if (months === 0) {
						return new Participant(member, null, months, `<1 month`)
					}

					if (`${months}`.at(-1) === "1" && months !== 11) {
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
					const memberRep = [...member.characters]
						.sort((a, b) => (
							// Choose member"s rep with the highest spec level
							getNumericSpec(a.specLevels[discipline]) > getNumericSpec(b.specLevels[discipline]) ? -1 : 1
						))[0]

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
