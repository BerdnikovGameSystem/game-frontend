<template lang="pug">
sidebar-provider.bg-card.text-card-foreground
  app-sidebar
  main.w-full
    .flex.flex-col.h-full
      .flex.flex-row.w-full.place-items-center.justify-items-start
        sidebar-trigger.m-2
        b BGS
        .grow-1
        .mr-4
          theme-toggler
      separator
      router-view
</template>
