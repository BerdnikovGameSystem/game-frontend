<template lang="pug">
.flex.flex-col.h-screen.w-screen.place-content-stretch.bg-card.text-card-foreground
  .flex.justify-center.place-items-center.relative.h-16
    .absolute.left-0.px-4
      theme-toggler
    p.text-2xl Berdnikov Game System
  separator
  .grow
    router-view
</template>