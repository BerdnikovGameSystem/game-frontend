<template lang="pug">
  sidebar
    sidebar-content
      sidebar-group
        sidebar-group-label Глобальное
        sidebar-group-content
          sidebar-menu
            sidebar-menu-item
              router-link(to="/sessions")
                sidebar-menu-button
                  i-radix-icons-heart
                  p Сессии
      separator
      sidebar-group
        sidebar-group-content
          // TODO: Оформить
          .mb-2.p-2.font-bold Выбранная сессия:
            p {{ selectedSession.session?.name || 'Не выбрано' }}
          div(v-if ="selectedSession.session")
            sidebar-group-label Информация о сессии
            sidebar-menu
              sidebar-menu-item
                router-link(to="/characters")
                  sidebar-menu-button
                    i-radix-icons-person
                    p Персонажи
              sidebar-menu-item
                sidebar-menu-button
                  i-radix-icons-cardStackPlus
                  p Сцены
</template>

<script setup lang="ts">
import { useSelectedSessionStore } from '@/stores/sessions'

const selectedSession = useSelectedSessionStore()
</script>
