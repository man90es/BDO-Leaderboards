import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LeaderBoard from '../views/LeaderBoard.vue'

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/custom/:discipline',
		name: 'customLeaderboard',
		component: LeaderBoard
	},
	{
		path: '/:region/:guildName/:discipline',
		name: 'leaderboard',
		component: LeaderBoard
	},
]

const router = createRouter({
	history: process.env.VUE_APP_USE_HASH_HISTORY == 'true' ? createWebHashHistory(process.env.BASE_URL) : createWebHistory(process.env.BASE_URL),
	routes
})

export default router
