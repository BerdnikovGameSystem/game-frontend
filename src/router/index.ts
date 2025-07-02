import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/home-view/HomeView.vue'
import BattleGridView from '@/views/battle-grid-view/BattleGridView.vue'
import SessionsStoreExampleView
  from '@/views/dev/sessions/SessionsStoreExampleView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
    {
      path: '/dev/sessions/store-example',
      name: 'dev-sessions-store-example',
      component: SessionsStoreExampleView,
    },
  ],
})

export default router
