import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/home-view/HomeView.vue'
import BattleGridView from '@/views/battle-grid-view/BattleGridView.vue'
import SessionsStore from '@/views/sessions/SessionsStore.vue'

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
      component: SessionsStore,
    },
  ],
})

export default router
