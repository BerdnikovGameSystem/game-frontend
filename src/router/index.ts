import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/home-view/HomeView.vue'
import BattleGridView from '@/views/battle-grid-view/BattleGridView.vue'
import SessionsStoreExampleView from '@/views/dev/sessions/SessionsStoreExampleView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/characters',
      name: 'characters',
      component: BattleGridView,
    },
    {
      path: '/sessions',
      name: 'sessions',
      component: SessionsStoreExampleView,
    },
  ],
})

export default router
