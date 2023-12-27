import { createRouter, createWebHashHistory, createWebHistory } from "vue-router"

export enum routeNameEnum {
	CUSTOM_LEADERBOARD = "customLeaderboard",
	HOME = "home",
	LEADERBOARD = "leaderboard",
}

const HomePage = () => import("@/views/HomePage.vue")
const LeaderboardPage = () => import("@/views/LeaderboardPage.vue")

export default createRouter({
	history: process.env.VUE_APP_USE_HASH_HISTORY === "true"
		? createWebHashHistory(process.env.BASE_URL)
		: createWebHistory(process.env.BASE_URL),
	routes: [
		{
			component: HomePage,
			name: routeNameEnum.HOME,
			path: "/",
		},
		{
			component: LeaderboardPage,
			name: routeNameEnum.CUSTOM_LEADERBOARD,
			path: "/custom/:discipline?",
		},
		{
			component: LeaderboardPage,
			name: routeNameEnum.LEADERBOARD,
			path: "/:region/:guildName/:discipline?",
		},
	]
})
