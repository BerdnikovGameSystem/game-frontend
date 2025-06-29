<template lang="pug">
  card
    card-header
      card-title
       p {{ player.name }}
    card-content
      p *Статы игрока*
</template>

<script setup lang="ts">
const props = defineProps(['player']);
</script>
