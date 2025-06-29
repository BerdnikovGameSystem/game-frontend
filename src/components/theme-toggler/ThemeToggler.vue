<template lang="pug">
dropdown-menu
  dropdown-menu-trigger
    btn
      i-radix-icons-moon(v-if="mode === 'dark'")
      i-radix-icons-sun(v-else-if="mode === 'light'")
      i-radix-icons-crosshair-1(v-else)
  dropdown-menu-content.mx-4
    dropdown-menu-item(@click='mode = "light"')
      i-radix-icons-sun
      span Светлая
    dropdown-menu-item(@click='mode = "dark"')
      i-radix-icons-moon
      span Тёмная
    dropdown-menu-item(@click='mode = "auto"')
      i-radix-icons-crosshair-1
      span Системная
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()
</script>
