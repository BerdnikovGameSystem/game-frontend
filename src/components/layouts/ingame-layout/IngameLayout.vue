<template lang="pug">
.flex.flex-col.h-full
  .grow
    slot
  separator
  .p-4.shrink
    players-bar(:players="[{name: 'Игрок 1'}, {name: 'Игрок 2'}, {name: 'Игрок 3'}]")
</template>
