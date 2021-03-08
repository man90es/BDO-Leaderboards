export function getNumericSpec(specText) {
	let parts = specText.split(' ')

	let offset = {
		"Beginner": 	0,
		"Apprentice": 	10,
		"Skilled": 		20,
		"Professional": 30,
		"Artisan": 		40,
		"Master": 		50,
		"Guru": 		80
	}[parts[0]]

	return offset + parseInt(parts[1])
}

export function sortByAttribute(attribute) {
	return (a, b) => a[attribute] > b[attribute] ? -1 : 1
}

export function assignPlaces(scoreAttribute) {
	return (participant, index, self) => {
		let prev = self[index - 1]

		if (prev === undefined) {
			participant.place = 1
			participant.colour = 1
		} else {
			participant.place = prev.place + 1

			if (prev[scoreAttribute] === participant[scoreAttribute]) {
				participant.groupWPrev = true
				participant.colour = prev.colour
			} else {
				participant.colour = prev.colour + 1
			}
		}

		return participant
	}
}
