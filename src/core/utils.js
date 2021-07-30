export function getNumericSpec(specText) {
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

export function capitalise(string) {
    return string[0].toUpperCase() + string.slice(1)
}
