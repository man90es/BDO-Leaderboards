import { createRouter, createWebHashHistory, createWebHistory } from "vue-router"
const HomePage = () => import("../views/HomePage.vue")
const LeaderboardPage = () => import("../views/LeaderboardPage.vue")

export default createRouter({
	history: process.env.VUE_APP_USE_HASH_HISTORY === "true"
		? createWebHashHistory(process.env.BASE_URL)
		: createWebHistory(process.env.BASE_URL),
	routes: [
		{
			component: HomePage,
			name: "home",
			path: "/",
		},
		{
			component: LeaderboardPage,
			name: "customLeaderboard",
			path: "/custom/:discipline?",
		},
		{
			component: LeaderboardPage,
			name: "leaderboard",
			path: "/:region/:guildName/:discipline?",
		},
	]
})
