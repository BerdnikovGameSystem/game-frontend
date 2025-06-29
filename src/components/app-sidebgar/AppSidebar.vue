<template lang="pug">
  sidebar
    sidebar-content
      sidebar-group
        sidebar-group-label Глобальное
        sidebar-group-content
          sidebar-menu
            sidebar-menu-item
              sidebar-menu-button
                i-radix-icons-heart
                p Сессии
      separator
      sidebar-group
        sidebar-group-label Для сессии
        sidebar-group-content
          // TODO: Оформить
          p.mb-4 Выбранная сессия:
            p Jopa123
          sidebar-menu
            sidebar-menu-item
              sidebar-menu-button
                i-radix-icons-person
                p Персонажи
            sidebar-menu-item
              sidebar-menu-button
                i-radix-icons-person
                p Мобы
            sidebar-menu-item
              sidebar-menu-button
                i-radix-icons-person
                p Сцены
</template>
