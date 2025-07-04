<template>
  <Select>
    <SelectTrigger>
      <SelectValue :placeholder="selectPlaceholder"/>
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>{{selectTitle}}</SelectLabel>
        <SelectItem v-for="item in selectItems"
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
  selectTitle: {
    type: String,
    default: ''
  },
  selectPlaceholder: {
    type: String,
    default: ''
  },
  selectItems: {
    type: Array as () => SelectItem[],
    required: true,
    default: () => []
  }
});

</script>
