import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from '@/App.vue'
import Home from '@/pages/Home.vue'
import Detail from '@/pages/Detail.vue'

const app = createApp(App)

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{ path: '/', component: Home },
		{ path: '/:name', component: Detail, props: true }
	]
})

app.use(router)
app.mount('#app')
