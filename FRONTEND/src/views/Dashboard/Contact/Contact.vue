<script setup>
import {onMounted, reactive, ref} from 'vue'
import {useContactStore} from "@/stores/contact"


const modal = ref(true)
const postInputValues = reactive({
    phone_number: '',
    staff_id: localStorage.getItem('id')
})


const store = useContactStore()

onMounted(() => {
    store.getContact(1)
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

const postPushFunc = () => {
    store.postContact(postInputValues)
    postInputValues.phone_number = ''
}

const selectPageFunc = (pageCount) => store.getContact(pageCount)
const showhide = () => modal.value = !modal.value

const formData = new FormData()
const inputFileUpload = (e) =>{
    const file = e.target.files[0]
    formData.append('excelfile', file)
    formData.append('staff_id', localStorage.getItem('role'))
    store.uploadExelFile(formData)
}
</script>

<template>

    <h1 class="text-black dark:text-white ml-2 font-bold uppercase">Kontaktlar ro'yhati</h1>

  <!-- Main modal -->
    <div
            id="contact"
            tabindex="-1"
            aria-hidden="true"
            :class="[
      modal
        ? 'hidden  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full'
        : 'wave overflow-y-auto flex overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full bg-gray-100'
    ]"
    >
        <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
            <!-- Modal content -->
            <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <!-- Modal header -->
                <div
                        class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"
                >
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Yangi kontakt qo'shish
                    </h3>
                    <button
                            @click="showhide"
                            type="button"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-toggle="contact"
                            id="contact"
                    >
                        <svg
                                aria-hidden="true"
                                class="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                    fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                            ></path>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <form action="#" @submit.prevent="()=> {}" @click.prevent>
                    <div class="grid gap-4 mb-4 sm:grid-cols-1">
                        <div>
                            <label
                                    for="brand"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Telefon raqam
                            </label>
                            <input
                                    type="tel"
                                    name="brand"
                                    id="brand"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Telefon raqam kiriting"
                                    v-model="postInputValues.phone_number"
                            />
                        </div>
                    </div>
                    <button
                            type="submit"
                            class="dark:text-white border border-gray-200 inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            @click="postPushFunc"
                    >
                        <svg
                                class="mr-1 -ml-1 w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                    fill-rule="evenodd"
                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                    clip-rule="evenodd"
                            ></path>
                        </svg>
                        Qo'shish
                    </button>
                </form>
            </div>
        </div>
    </div>

    <section class="bg-gray-50 dark:bg-gray-900 sm:p-5 md:p-0 my-2">
        <div class="mx-auto max-w-screen-x lg:px-0">
            <!-- Start coding here -->
            <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                <div
                        class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4"
                >
                    <div
                            class="w-full md:w-auto flex flex-col gap-2 md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
                    >
                        <button
                                id="defaultModalButton"
                                data-modal-toggle="contact"
                                type="button"
                                @click="showhide"
                                class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                            <svg
                                    class="h-3.5 w-3.5 mr-2"
                                    fill="currentColor"
                                    viewbox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                            >
                                <path
                                        clip-rule="evenodd"
                                        fill-rule="evenodd"
                                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                />
                            </svg>
                            Yangi raqam qo'shish
                        </button>
                        <div>
                            <input class="px-[10px] py-[5px] w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                   id="file_input" type="file" @change="inputFileUpload">
                        </div>
                        Exel File yuklash
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                           v-if="store.state.status === 'success'">
                        <thead
                                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                        >
                        <tr>
                            <th scope="col" class="px-4 py-3">Tel:</th>
                            <th scope="col" class="px-4 py-3">Qo'shilgan vaqt</th>
                            <th scope="col" class="px-4 py-3">
                                <span class="sr-only">Actions</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody>

                        <tr class="border-b dark:border-gray-700" v-for="item in store.LIST" :key="item._id">
                            <th
                                    scope="row"
                                    class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {{ item.phone_number }}
                            </th>

                            <td class="px-4 py-3">{{ dateFormatter(item.createdAt) }}</td>

                            <td class="px-4 py-3 flex items-center justify-center">
                                <button
                                        @click="store.deleteContact(item._id)"
                                        class="bg-red-600 px-3 py-1 text-white rounded-2xl focus:ring-2"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <div role="status" class="flex justify-center" v-else-if="store.state.status === 'loading'">
                        <svg aria-hidden="true"
                             class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentFill"/>
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>

                </div>

                <nav
                        class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                        aria-label="Table navigation"
                >
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
            Sahifalar
            <span class="font-semibold text-gray-900 dark:text-white">1-{{ store.state.pageInfo.totalPages }}</span>
            dan
            <span class="font-semibold text-gray-900 dark:text-white">{{ store.state.pageInfo.totalCount }}</span>
          </span>


                    <ul class="inline-flex items-stretch -space-x-px">
                        <li
                                @click="store.state.page > 1 && selectPageFunc(store.state.page-1)"
                                v-if="store.state.page > 1"
                        >
                            <a
                                    href="#"
                                    class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                <span class="sr-only">Oldinga</span>
                                <svg
                                        class="w-5 h-5"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewbox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                            fill-rule="evenodd"
                                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                            clip-rule="evenodd"
                                    />
                                </svg>
                            </a>
                        </li>

                        <li v-for="item in store.state.countPages" @click="()=> selectPageFunc(item)">
                            <a
                                    v-if="(store.state.page-1)  === item || store.state.page === item || ((store.state.page+1) === item || item === 3)"
                                    href="#"
                                    class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                <p v-if="item === store.state.page">[ {{ item }} ]</p>
                                <p v-else>{{ item }}</p>
                            </a
                            >
                        </li>

                        <li @click="store.state.page < store.state.countPages.length && selectPageFunc(store.state.page+1)"
                            v-if="store.state.page < store.state.countPages.length">
                            <a
                                    href="#"
                                    class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                <span class="sr-only">Keyingisi</span>
                                <svg
                                        class="w-5 h-5"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewbox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                            fill-rule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clip-rule="evenodd"
                                    />
                                </svg>
                            </a>
                        </li>
                    </ul>


                </nav>
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
