<template lang="pug">
dropdown-menu
  dropdown-menu-trigger
    btn Цветовая схема
  dropdown-menu-content
    dropdown-menu-item(@click='mode = "light"') Светлая
    dropdown-menu-item(@click='mode = "dark"') Тёмная
    dropdown-menu-item(@click='mode = "auto"') Системная
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()
</script>
