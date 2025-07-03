<template>
  <Select>
    <SelectTrigger>
      <SelectValue :placeholder="select_placeholder"/>
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>{{select_title}}</SelectLabel>
        <SelectItem v-for="item in select_items"
        :key="item.value"
        :value="item.value">
          {{ item.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface SelectItem {
  value: string;
  label?: string;
}

const props = defineProps({
  select_title: {
    type: String,
    default: ''
  },
  select_placeholder: {
    type: String,
    default: ''
  },
  select_items: {
    type: Array as () => SelectItem[],
    required: true,
    default: () => []
  }
});

</script>
