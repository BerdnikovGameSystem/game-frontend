<template lang="pug">
  .bg-gray-800.rounded-md.h-16.px-16 {{ player.name }}
</template>

<script setup lang="ts">
const props = defineProps(['player']);
</script>
