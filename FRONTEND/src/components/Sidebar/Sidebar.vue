<script setup>
import {onMounted, ref} from "vue"
import {navlinks} from "../../constants/navlinks"
import router from "@/router"

const roleState = ref(null)

onMounted(() => {
    roleState.value = localStorage.getItem('role')
})

const logoutFunc = () => {
    localStorage.removeItem('role')
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    router.push('/login')
}
const navlink = ref(navlinks)
</script>

<template>
    <div>
        <button
                data-drawer-target="default-sidebar"
                data-drawer-toggle="default-sidebar"
                aria-controls="default-sidebar"
                type="button"
                class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
            <span class="sr-only">Open sidebar</span>
            <svg
                    class="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
            >
                <path
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
            </svg>
        </button>

        <aside
                id="default-sidebar"
                class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
        >
            <div class="flex flex-col justify-between h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <div>
                    <h2 class="p-3 text-xl font-bold">CRM-OPERATORS</h2>

                    <ul class="space-y-2 font-medium">
                        <li v-for="link in navlink" :key="link.id">

                            <router-link
                                    v-if="link.role.includes(roleState)"
                                    :to="link.to"
                                    class="border-transparent flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <i :class="link.icon"></i>
                                <span class="ml-3">{{ link.title }}</span>
                            </router-link>
                        </li>
                    </ul>
                </div>

                <div class="flex flex-col">
                  <span class="bg-green-700 px-2 py-3 block my-2 text-white rounded-2xl text-center">{{ roleState }}</span>
                    <button
                            class="bg-red-500 px-3 py-2 font-semibold w-full focus:ring-1 focus:ring-white focus:text-white rounded-2xl"
                            @click="logoutFunc"
                    >
                        <span>CHIQISH</span> <i class="bx bx-power-off"></i>
                    </button>
                </div>

            </div>
        </aside>
    </div>
</template>

<style lang="css" scoped>
.router-link-active {
    border: 1px dashed rgba(128, 128, 128, 0.586);
}
</style>
