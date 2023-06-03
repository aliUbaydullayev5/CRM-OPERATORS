<script setup>
import Sidebar from '../../components/Sidebar/Sidebar.vue'
</script>

<template>
  <section id="main" class="w-full">
    <Sidebar />
    <div class="p-4 sm:ml-64">
      <div class="border-2 p-4 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <router-view></router-view>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
