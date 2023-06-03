<script setup>

import {useOrderStore} from "@/stores/order"
import {onMounted, reactive, ref, watch} from "vue"
import {useProductStore} from "@/stores/product"
import it, {toast} from "vue3-toastify"
import ModalComponent from "@/components/ModalComponent/ModalComponent.vue"
import {useDeliveryStore} from "@/stores/delivery"
import {employee} from "@/service/empolyee"

const productStore = useProductStore()
const store = useOrderStore()
const deliveryStore = useDeliveryStore()


const userInfo = reactive({
    full_name: '',
    address: '',
    target_address: '',
    status: 2,
    description: '',
    product_id: '',
    contact_id: '',
    staff_id: localStorage.getItem('id'),
})

const userPhoneInfo = ref({})

watch(
    () => store?.state?.randomContactStatus,
    () => {
        if (store?.state?.randomContactStatus === 'success') {
            userPhoneInfo.value = store?.state
            userInfo.contact_id = store?.state?.randomContact._id
        }
    }
)

watch(
    () => store.state.addOrderStatus,
    () => {
        if (store.state.addOrderStatus === 'success') {
            toast.success("Malumot muvofiyaqatli saqlandi")
            userInfo.full_name = ''
            userInfo.address = ''
            userInfo.target_address = ''
            userInfo.description = ''
            userInfo.product_id = ''
            userInfo.contact_id = ''
            userPhoneInfo.value = {}
        }
    },
    {deep: true}
)

onMounted(() => {
    store.getOrders(1)
    productStore.getProduct(1)
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


const pushUserInfo = () => {
    if (
        userInfo.full_name.length &&
        userInfo.address.length &&
        userInfo.target_address.length &&
        userInfo.description.length &&
        userInfo.product_id.length &&
        userInfo.contact_id.length
    ) {
        store.addOrder(userInfo)
    } else {
        toast.warning('Toliq toldiring')
    }
}

const showModal = ref(false)

const deliveryInfo = reactive({
    order_id: "",
    staff_id: "",
    status: 1,
    description: ""
})

const changeShowModal = ({order_id, status}) => {
    showModal.value = !showModal.value
    if(showModal?.value && order_id){
        deliveryInfo.order_id = order_id
        deliveryInfo.status = status
    }
    if(!showModal?.value && order_id){
        deliveryInfo.order_id = ''
        deliveryInfo.description = ''
    }
}

watch(
    ()=> deliveryStore.state.addStatus,
    ()=> {
        if(deliveryStore.state.addStatus === 'success'){
            deliveryInfo.description = ''
            showModal.value = false
        }
    },
)

watch(
    ()=> deliveryInfo,
    ()=> {
        console.log(deliveryInfo, 'dasdasdasads')
    },
    {
        deep: true
    }
)

const successFunc = () => {
    if(deliveryInfo.staff_id.length){
        deliveryStore.addDelivery(deliveryInfo)
    }else{
        toast.warning('Yetkazuvchi tallang')
    }
}

const empolyee = ref([])

onMounted( async ()=> {
    await employee.deliveryList().then((res)=> {
        if(res.data.success) empolyee.value = res.data.data
    })
})

</script>

<template>

    <modal-component :show-modal="showModal" :change-show-modal="changeShowModal" :successFunc="successFunc">
        <div class="flex flex-col gap-4">
            <select
                id="category"
                class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                @change="deliveryInfo.status = $event.target.value"
            >
                <option :selected="deliveryInfo.status == 1" value="1">Status - 1</option>
                <option :selected="deliveryInfo.status == 2" value="2">Status - 2</option>
            </select>
            <select
                id="category"
                class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                @change="deliveryInfo.staff_id = $event.target.value"
            >
                <option value="" selected>Yetkazuvchi tallang</option>
                <option v-for="item in empolyee" :key="item._id" :value="item._id">{{item.full_name}}</option>
            </select>
            <input
                type="text"
                name="text"
                id="tel"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Batafsil"
                v-model="deliveryInfo.description"
            />
        </div>
    </modal-component>

    <h1 class="text-black dark:text-white ml-2 my-2 font-bold uppercase">Buyurtma qo'shish</h1>

  <!-- Main modal -->
    <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <!-- Modal header -->
        <div
                class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"
        >
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Yangi buyurtma oliish</h3>

        </div>

        <!-- Modal body -->
        <form action="#" @submit.prevent>
            <div class="grid gap-4 mb-4 sm:grid-cols-2">

                <div style="display: grid; grid-template-columns: 5fr 1fr; gap: 10px; align-items: end;">
                    <div>
                        <label for="tel" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Telefon raqam</label
                        >
                        <input
                                type="tel"
                                name="tel"
                                id="tel"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                :placeholder="'Telefon raqam'"
                                required=""
                                disabled
                                :value="userPhoneInfo?.randomContact?.phone_number"

                        />
                    </div>
                    <div>

                        <button
                                class="dark:text-white border border-gray-200 inline-flex items-center justify-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                @click="store.randomContact"
                                :disabled="store.state.randomContactStatus === 'loading'"
                        >
                            <p v-if="!(store.state.randomContactStatus === 'loading')">Istash</p>
                            <div role="status" v-if="store.state.randomContactStatus === 'loading'">
                                <svg aria-hidden="true"
                                     class="inline w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                     viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                          fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                          fill="currentFill"/>
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>
                        </button>

                    </div>
                </div>

                <div>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >I.F.O :</label
                    >
                    <input
                            type="text"
                            name="name"
                            id="name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="ism kiriting"
                            required=""
                            v-model="userInfo.full_name"
                    />
                </div>

                <div>
                    <label for="desc" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Batafsil</label
                    >
                    <input
                            type="text"
                            name="desc"
                            id="desc"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Batafsil"
                            required=""
                            v-model="userInfo.description"
                    />
                </div>
                <div>

                    <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Address</label
                    >
                    <input
                            type="text"
                            name="address"
                            id="address"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Address"
                            required=""
                            v-model="userInfo.address"
                    />

                </div>

                <div>

                    <label for="arientir" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Orientir</label
                    >
                    <input
                            type="text"
                            name="arientir"
                            id="arientir"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Orientir"
                            required=""
                            v-model="userInfo.target_address"
                    />

                </div>
                <div>
                    <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Mahsulot turini tanlang</label
                    >
                    <select
                            id="category"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            v-model="userInfo.product_id"
                    >
                        <option selected="">Mahsulot turini tanlang</option>
                        <option v-for="item in productStore.LIST" :value="item._id" :key="item._id">{{ item.name }}
                        </option>
                    </select>
                </div>
            </div>
            <button
                    type="submit"
                    class="dark:text-white border border-gray-200 inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    @click="pushUserInfo"
            >
                <svg
                        class="mr-1 -ml-1 w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        v-if="!(store.state.addOrderStatus === 'loading')"
                >
                    <path
                            fill-rule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clip-rule="evenodd"
                    ></path>
                </svg>
                <p v-if="!(store.state.addOrderStatus === 'loading')">Qo'shish</p>

                <div role="status" v-if="store.state.addOrderStatus === 'loading'">
                    <svg aria-hidden="true"
                         class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>

            </button>
        </form>
    </div>

    <section class="bg-gray-50 dark:bg-gray-900 sm:p-5 md:p-0 my-2">
        <div class="mx-auto max-w-screen-x lg:px-0">
            <!-- Start coding here -->
            <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                <div
                        class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4"
                >
                </div>
                <div class="overflow-x-auto h-[500px] overflow-y-scroll">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead
                                class="z-10 sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                        >
                        <tr>
                            <th scope="col" class="px-4 py-3">I.F.O</th>
                            <th scope="col" class="px-4 py-3">Holati</th>
                            <th scope="col" class="px-4 py-3">Qo'shilgan sana</th>
                            <th scope="col" class="px-4 py-3">Plastik raqami</th>
                            <th scope="col" class="px-4 py-3">Holati</th>
                            <th scope="col" class="px-4 py-3">MAQSAD MANZILI</th>
                            <th scope="col" class="px-4 py-3">Delete</th>
                            <th scope="col" class="px-4 py-3">Delivery</th>
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
                            <td class="px-4 py-3">
                                <button
                                        @click="store.deleteOrder(item._id)"
                                        class="bg-red-600 px-3 py-1 text-white rounded-2xl focus:ring-2"
                                >
                                    Delete
                                </button>
                            </td>
                            <td>
                                <button
                                        class="bg-blue-600 px-3 py-1 text-white rounded-2xl focus:ring-2"
                                        @click="()=> changeShowModal({order_id: item._id, status: item.status})"
                                >
                                    Add Delivery
                                </button>
                            </td>
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
