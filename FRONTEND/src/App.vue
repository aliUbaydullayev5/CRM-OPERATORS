<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

onMounted(() => {
  initFlowbite()
})

</script>

<template>
  <div class="dark:bg-gray-900">
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>

</style>
