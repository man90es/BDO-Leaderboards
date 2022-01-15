import { computed } from "vue"
import { useStore } from "vuex"
import { useRoute } from "vue-router"

import { Participant } from "../models"

const PRIVATE_LEVEL   = 0b1
const PRIVATE_CONTRIB = 0b100
const PRIVATE_SPECS   = 0b1000

function getNumericSpec(specText) {
	const parts = specText.split(" ")
	const offset = {
		"Beginner":     0,
		"Apprentice":   10,
		"Skilled":      20,
		"Professional": 30,
		"Artisan":      40,
		"Master":       50,
		"Guru":         80,
	}[parts[0]]

	return offset + parseInt(parts[1])
}

export default function() {
	const store = useStore()
	const route = useRoute()

	const discipline = computed(() => route.params.discipline)
	const members = computed(() => route.name === "customLeaderboard"
		? store.getters.customMembers
		: store.getters.members(route.params.guildName)
	)

	const leaderboardItems = computed(() => {
		return members.value
			.map((member) => {
				if (
					(member.privacy & PRIVATE_CONTRIB && ["contribution"].includes(discipline.value)) ||
					(member.privacy & PRIVATE_LEVEL && ["level", "combat"].includes(discipline.value)) ||
					(member.privacy & PRIVATE_SPECS && !["contribution", "level", "combat", "characters"].includes(discipline.value))
				) {
					return new Participant(member, null, -1, "Private")
				}

				switch (discipline.value) {
					case "contribution": {
						return new Participant(member, null, member.contributionPoints)
					}

					case "characters": {
						return new Participant(member, null, member.characters.length)
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
								return getNumericSpec(a.specLevels[discipline.value]) > getNumericSpec(b.specLevels[discipline.value]) ? -1 : 1
							})[0]

						return new Participant(member, memberRep, getNumericSpec(memberRep.specLevels[discipline.value]), memberRep.specLevels[discipline.value])
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
	})

	return { leaderboardItems }
}
