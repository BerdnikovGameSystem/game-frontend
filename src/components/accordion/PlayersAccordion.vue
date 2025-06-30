<template>
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>{{ title }}</AccordionTrigger>
      <div class="flex justify-end">
        <Button class="ml-auto">{{ button_name }}</Button>
      </div>
      <AccordionContent class="flex-column">
        <table-element></table-element>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
import Button from "../ui/button/Button.vue";

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  button_name:{
    type:String
  }
})
</script>
