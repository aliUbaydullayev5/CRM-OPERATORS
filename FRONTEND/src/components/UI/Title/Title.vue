<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  title: String
})
</script>

<template>
  <div class="p-4 rounded-xl bg-[rgab(0,0,0,0.23)]">
    <h3>{{ props?.title }}</h3>
  </div>
</template>

<style></style>
