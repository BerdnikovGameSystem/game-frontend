<template lang="pug">
.absolute.h-screen.w-screen.left-0.top-0.flex.items-center.justify-center.opacity-10.-z-50
  p.text-5xl Игровая область
.flex.flex-col.h-full
  .grow
    slot
  .bg-zinc-800.p-4
    players-bar
</template>
