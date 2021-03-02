import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LeaderBoard from '../views/LeaderBoard.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/:region/:guildName/:discipline',
		name: 'LeaderBoard',
		component: LeaderBoard
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
