<script setup>


import {onMounted} from "vue"
import {useOrderStore} from "@/stores/order"

const store = useOrderStore()

onMounted(() => {
    store.getOrders(1)
})

const dateFormatter = (date) => {
    const dateTime = new Date(date)
    const options = {
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        day: "numeric",
    }
    return new Intl.DateTimeFormat("en-US", options).format(dateTime)
}


</script>

<template>
    <h1 class="text-black dark:text-white ml-2 my-2 font-bold uppercase">Buyurtma qo'shish</h1>
  <!-- Main modal -->

    <section class="bg-gray-50 dark:bg-gray-900 sm:p-5 md:p-0 my-2">
        <div class="mx-auto max-w-screen-x lg:px-0">
            <!-- Start coding here -->
            <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                <div class="overflow-x-auto h-[500px] overflow-y-scroll">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead
                                class="z-50 sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                        >
                        <tr>
                            <th scope="col" class="px-4 py-3">I.F.O</th>
                            <th scope="col" class="px-4 py-3">Lavozimi</th>
                            <th scope="col" class="px-4 py-3">Qo'shilgan sana</th>
                            <th scope="col" class="px-4 py-3">Batafsil</th>
                            <th scope="col" class="px-4 py-3">Address</th>
                            <th scope="col" class="px-4 py-3">maqsad manzili</th>
                            <th scope="col" class="px-4 py-3"></th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b dark:border-gray-700" v-for="item in store.LIST" :key="item._id">
                                <th
                                        scope="row"
                                        class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {{ item.full_name }}
                                </th>
                                <td class="px-4 py-3">
                                    <div v-if="item.status == '1'" class="bg-blue-600 px-3 text-white rounded-2xl py-[5px] text-center">bajarilmagan- [1]</div>
                                    <div v-if="item.status == '2'" class="bg-green-600 px-3 text-white rounded-2xl py-[5px] text-center">bajarilyapti- [2]</div>
                                    <div v-if="item.status == '3'" class="bg-orange-600 px-3 text-white rounded-2xl py-[5px] text-center">forse major- [3]</div>
                                </td>
                                <td class="px-4 py-3">{{ dateFormatter(item.createdAt) }}</td>
                                <td class="px-4 py-3">{{ item.description }}</td>
                                <td class="px-4 py-3">{{ item.address }}</td>
                                <td class="px-4 py-3">{{ item.target_address }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.wave {
  background-color: #05002981;
  backdrop-filter: blur(2px);
}
</style>
