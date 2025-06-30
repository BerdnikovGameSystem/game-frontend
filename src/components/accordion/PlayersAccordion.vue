<template>
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>{{ title }}</AccordionTrigger>
      <div class="flex justify-end">
        <BtnElem class="ml-auto">{{ button_name }}</BtnElem>
      </div>
      <AccordionContent class="flex-column">
        <table-element></table-element>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
import BtnElem from "../ui/btn/BtnElem.vue";

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
