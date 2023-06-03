<template>
    <div v-if="props.showModal"
         class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
        <div class="relative my-6 mx-auto w-full max-w-[500px] m-y-[50px]">
            <!--content-->
            <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-900 outline-none focus:outline-none">
                <div class="relative p-6 flex-auto">
                  <slot />
                </div>
                <!--footer-->
                <div class="flex items-center justify-between p-6 rounded-b">
                    <button class="text-blue-500 bg-transparent border border-solid border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button" v-on:click="props.successFunc">
                        Add
                    </button>
                    <button class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button" v-on:click="props.changeShowModal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div v-if="props.showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    showModal: {
        type: Boolean,
        required: true
    },
    changeShowModal: {
        type: Function,
        required: true
    },
    successFunc: {
        type: Function,
        required: true
    }
})

</script>

<style lang="scss" scoped>

</style>
