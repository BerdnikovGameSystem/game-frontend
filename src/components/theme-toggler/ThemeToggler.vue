<template lang="pug">
dropdown-menu
  dropdown-menu-trigger
    Button(variant='ghost')
      theme-toggler-button-icon
  dropdown-menu-content.mx-4
    dropdown-menu-item.cursor-pointer(@click='mode = "light"')
      i-radix-icons-sun
      span Светлая
    dropdown-menu-item.cursor-pointer(@click='mode = "dark"')
      i-radix-icons-moon
      span Тёмная
    dropdown-menu-item.cursor-pointer(@click='mode = "auto"')
      i-radix-icons-desktop
      span Системная
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import Button from '../ui/button/Button.vue'

const mode = useColorMode()
</script>
