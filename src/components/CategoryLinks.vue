<template>
	<router-link to="./level">Character Level</router-link>
	<router-link to="./contribution">Contribution Points</router-link>
	<router-link to="./gathering">Gathering</router-link>
	<router-link to="./fishing">Fishing</router-link>
	<router-link to="./hunting">Hunting</router-link>
	<router-link to="./cooking">Cooking</router-link>
	<router-link to="./alchemy">Alchemy</router-link>
	<router-link to="./processing">Processing</router-link>
	<router-link to="./training">Training</router-link>
	<router-link to="./trading">Trading</router-link>
	<router-link to="./farming">Farming</router-link>
	<router-link to="./sailing">Sailing</router-link>
	<router-link to="./barter">Barter</router-link>
	<router-link to="./combat">Combat Fame</router-link>
	<router-link to="./life">Life Fame</router-link>
	<router-link to="./characters">Number of Characters</router-link>
</template>

<style scoped>
	a {
		text-decoration: none;
		color: var(--colour-black);

		opacity: 0.7;
	}

	a:hover {
		opacity: 1;
	}

	.router-link-exact-active {
		opacity: 1;
	}
</style>
