<script setup>
import {onMounted, reactive, ref, watch} from "vue"
import {useProductStore} from "@/stores/product"
import {category} from "@/service/category"

const modal = ref(true)

const showhide = () => {
    modal.value = !modal.value
}

const state = useProductStore()
const categoryState = ref([])
const fetchCategory = async () => {
    await category.list()
        .then((res) => {
            if (res.data.status === 200) categoryState.value = res.data.data
        })
}

const product = reactive({
    name: "",
    price: "",
    category_id: "",
    staff_id: localStorage.getItem('id'),
    images: "",
})

onMounted(() => {
    state.getProduct(1)
    fetchCategory()
})

const selectPageFunc = (pageCount) => {
    state.getProduct(pageCount)
}

const formData = new FormData()

watch(
    () => state.state.postStatus,
    () => {
        if (state.state.postStatus === 'success') {
            showhide()
            product.name = ''
            product.price = ''
            product.category_id = ''
            product.images = ''
        }
    },
    {
        deep: true
    }
)

const setImg = (e) => {
    const file = e.target.files[0]
    formData.append('images', file)
}


const addProduct = () => {
    formData.append('name', product.name + '')
    formData.append('price', product.price)
    formData.append('category_id', product.category_id)
    formData.append('staff_id', localStorage.getItem('id'))
    state.postProduct(formData)
}


const showModal = ref(false)
const toggleModal = (id) => {
    showModal.value = id
}

</script>

<template>
    <h1 class="text-black dark:text-white ml-2 my-1 font-bold uppercase">
        Mahsulotlar ro'yhati
    </h1>

  <!-- Main modal -->
    <div
            id="product"
            tabindex="-1"
            aria-hidden="true"
            :class="[
      modal
        ? 'hidden  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full'
        : 'wave overflow-y-auto flex overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full bg-gray-100',
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
                        Yangi mahsulot qo'shish
                    </h3>
                    <button
                            @click="showhide"
                            type="button"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-toggle="product"
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
                <form action="#" @submit.prevent="addProduct">
                    <div class="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <label
                                    for="name"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Mahsulot nomi</label
                            >
                            <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="mahsulot nomini kiriting"
                                    required=""
                                    v-model="product.name"
                            />
                        </div>
                        <div>
                            <label
                                    for="brand"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Mahsulot narxi
                            </label>
                            <input
                                    type="number"
                                    name="brand"
                                    id="brand"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="mahsulot narxini kiriting"
                                    required=""
                                    v-model="product.price"
                            />
                        </div>
                        <div>
                            <label
                                    for="price"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Mahsulot rasmi</label
                            >
                            <input
                                    type="file"
                                    accept="image/*"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="8600 1234 5678 9001"
                                    required=""
                                    @change="setImg($event)"
                            />
                        </div>
                        <div>
                            <label
                                    for="category"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Mahsulot turini tanlang</label
                            >
                            <select
                                    v-model="product.category_id"
                                    id="category"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                                <option selected>turini tanlang</option>
                                <option v-for="item in categoryState" :key="item._id" :value="item._id">
                                    {{ item.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <button
                            type="submit"
                            class="dark:text-white border border-gray-200 inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
            <div
                    class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden"
            >
                <div
                        class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4"
                >
                    <div class="w-full md:w-1/2">

                    </div>
                    <div
                            class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
                    >
                        <button
                                id="defaultModalButton"
                                data-modal-toggle="product"
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
                            Yangi mahsulot qo'shish
                        </button>
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead
                                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                        >
                        <tr>
                            <th scope="col" class="px-4 py-3">Mahsulot nomi</th>
                            <th scope="col" class="px-4 py-3">Mahsulot turi</th>
                            <th scope="col" class="px-4 py-3">Mahsulot narxi</th>
                            <th scope="col" class="px-4 py-3">Image</th>
                            <th scope="col" class="px-4 py-3">
                                <span class="sr-only">Actions</span>
                            </th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr class="border-b dark:border-gray-700" v-for="item in state.LIST" :key="item._id">
                            <th
                                    scope="row"
                                    class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {{ item.name }}
                            </th>
                            <td class="px-4 py-3">{{ item.category_id ? item.category_id?.name : 'not fount' }}</td>
                            <td class="px-4 py-3">{{ item.price }}</td>
                            <td>

                                <button class="bg-blue-500 text-white active:bg-black-600 font-bold uppercase text-sm px-6 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button" v-on:click="toggleModal(item._id)">
                                    Open Image
                                </button>

                                <div v-if="showModal === item._id"
                                     class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
                                    <div class="relative w-auto my-6 mx-auto max-w-6xl">
                                        <!--content-->
                                        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-900 outline-none focus:outline-none">
                                            <div class="relative p-6 flex-auto">
                                                <img :src=item?.images[0] />
                                            </div>
                                            <!--footer-->
                                            <div class="flex items-center justify-end p-6 rounded-b">
                                                <button class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button" v-on:click="toggleModal()">
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="showModal === item._id" class="opacity-25 fixed inset-0 z-40 bg-black"></div>

                                <!--                                <img :src=item?.images[0] style="height: 50px" />-->


                            </td>
                            <td class="px-4 py-3 flex items-center justify-center">
                                <button
                                        @click="state.deleteProduct(item._id)"
                                        class="bg-red-600 px-3 py-1 text-white rounded-2xl focus:ring-2"
                                        :disabled="state.state.deleteStatus === 'loading'"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                </div>
                <nav
                        class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                        aria-label="Table navigation"
                >
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
            Sahifalar
            <span class="font-semibold text-gray-900 dark:text-white">1-{{ state.state.pageInfo.totalPages }}</span>
            dan
            <span class="font-semibold text-gray-900 dark:text-white">{{ state.state.pageInfo.totalCount }}</span>
          </span>

                    <ul class="inline-flex items-stretch -space-x-px">
                        <li @click="state.state.page > 1 && selectPageFunc(state.state.page-1)"
                            v-if="state.state.page > 1">
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

                        <li v-for="item in state.state.countPages" @click="()=> selectPageFunc(item)">
                            <a
                                    v-if="(state.state.page-1)  === item || state.state.page === item || ((state.state.page+1) === item || item === 3)"
                                    href="#"
                                    class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                <p v-if="item === state.state.page">[ {{ item }} ]</p>
                                <p v-else>{{ item }}</p>
                            </a
                            >
                        </li>

                        <li @click="state.state.page < state.state.countPages.length && selectPageFunc(state.state.page+1)"
                            v-if="state.state.page < state.state.countPages.length">
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
