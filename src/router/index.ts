import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home-view/HomeView.vue'
import BattleGridView from '@/views/battle-grid-view/BattleGridView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/battle-grid',
      name: 'battle-grid',
      component: BattleGridView,
    },
  ],
})

export default router
