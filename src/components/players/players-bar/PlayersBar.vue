<template lang="pug">
  .flex.flex-row.gap-4
    player-card(v-for='player in players' :key="player.name" :player="player")
</template>

<script setup lang="ts">
import { ref } from 'vue'

const players = ref([
  {
    name: 'Player #1',
  },
  {
    name: 'Player #2',
  },
  {
    name: 'Player #3',
  },
])
</script>
