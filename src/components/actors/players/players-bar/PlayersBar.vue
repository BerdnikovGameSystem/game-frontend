<template lang="pug">
  .flex.flex-row.gap-4
    player-card(
      v-for='player in props.players'
      :key="player.name"
      :player="player"
    )
</template>

<script setup lang="ts">
const props = defineProps(['players']);
</script>
