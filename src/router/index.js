import { createRouter, createWebHashHistory, createWebHistory } from "vue-router"
const HomeView = () => import("../views/Home.vue")
const LeaderboardView = () => import("../views/Leaderboard.vue")

export default createRouter({
	history: process.env.VUE_APP_USE_HASH_HISTORY === "true"
		? createWebHashHistory(process.env.BASE_URL)
		: createWebHistory(process.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView
		},
		{
			path: "/custom/:discipline?",
			name: "customLeaderboard",
			component: LeaderboardView
		},
		{
			path: "/:region/:guildName/:discipline?",
			name: "leaderboard",
			component: LeaderboardView
		},
	]
})
