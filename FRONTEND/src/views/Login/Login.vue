<script setup>


import { ref, reactive } from 'vue'
import { auth } from '../../service/auth'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const state = reactive({
  username: '',
  password: ''
})

const router = useRouter()

const login = () => {
  let loginUser = {
    login: state.username,
    password: state.password
  }
  auth(loginUser)
    .then((res) => {
        localStorage.setItem('id', res?.data?.data?.staff?.id)
        localStorage.setItem('role', res?.data?.data?.staff?.role)
        localStorage.setItem('token', res?.data?.data?.token)

      if (res.status === 200) {
        toast.success('Login successful')
        return router.push('/')
      }
    })
    .catch((err) => {
      toast.error('Login failed')
    })
}
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a
        href="#"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img
          class="w-8 h-8 mr-2"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
          alt="logo"
        />
        CRM-OPERATOR
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Admin dashboard
          </h1>
          <form class="space-y-4 md:space-y-6" action="#" @submit.prevent="login">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Login</label
              >
              <input
                type="text"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
                v-model="state.username"
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Parol</label
              >
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                v-model="state.password"
              />
            </div>
            <div class="flex items-center justify-between">
              <a
                href="#"
                class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >esingizdan chiqdimi?</a
              >
            </div>
            <button
              type="submit"
              class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Kirish
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
