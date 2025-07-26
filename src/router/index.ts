import { createRouter, createWebHashHistory } from 'vue-router'
import BattleGridView from '@/views/battle-grid-view/BattleGridView.vue'
import SessionsStoreExampleView from '@/views/dev/sessions/SessionsStoreExampleView.vue'
import { useSelectedSessionStore } from '@/stores/sessions'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: () => {
        if (useSelectedSessionStore().isSelected()) {
          // TODO: is game started => ingame view

          return { path: '/characters' }
        } else {
          return { path: '/sessions' }
        }
      },
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
