<template lang="pug">
  i-radix-icons-moon(v-if='mode === "dark"')
  i-radix-icons-sun(v-else-if='mode === "light"')
  i-radix-icons-desktop(v-else)
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()
</script>
