<script setup>
import {useDeliveryStore} from "@/stores/delivery"
import {onMounted, reactive, ref, watch} from "vue"
import ModalComponent from "@/components/ModalComponent/ModalComponent.vue"


const store = useDeliveryStore()

onMounted(() => {
    store.getDelivery()
})
//
//
// watch(
//     ()=> store.LIST,
//     ()=> {
//     },
//     {
//         deep: true
//     }
// )
//
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

const showModal = ref(false)

const deliveryInfo = reactive({
    order_id: "",
    // staff_id: localStorage.getItem('id'),
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
    ()=> store.state.updateStatus,
    ()=> {
        if(store.state.updateStatus === 'success'){
            deliveryInfo.description = ''
            showModal.value = false
        }
    },
)

const successFunc = () => {
    store.putDelivery({
        id: deliveryInfo.order_id,
        data: {
            status: deliveryInfo.status,
            description: deliveryInfo.description
        }
    })
}

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
                <option :selected="deliveryInfo.status == 3" value="3">Status - 3</option>
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

    <h1 class="text-black dark:text-white ml-2 my-1 font-bold uppercase">
        Mahsulotlar ro'yhati
    </h1>

    <section class="bg-gray-50 dark:bg-gray-900 sm:p-5 md:p-0 my-2">
        <div class="mx-auto max-w-screen-x lg:px-0">
            <div
                    class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden"
            >
                <div class="overflow-x-auto">
                    {{store.state.status}}
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead
                                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                        >
                        <tr>
                            <th scope="col" class="px-4 py-3">Yaralgan vahti</th>
                            <th scope="col" class="px-4 py-3">Address</th>
                            <th scope="col" class="px-4 py-3">Arientir</th>
                            <th scope="col" class="px-4 py-3">Batafsil</th>
                            <th scope="col" class="px-4 py-3">Holati</th>
                            <th scope="col" class="px-4 py-3">Delete</th>
                            <th scope="col" class="px-4 py-3">Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="border-b dark:border-gray-700" v-for="item in store.LIST" :key="item?._id">
                            <th
                                    class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {{ item?.order_id?.createdAt ? dateFormatter(item?.order_id?.createdAt) : 'zakaz topilmadi' }}
                            </th>
                            <td class="px-4 py-3">{{ item?.order_id?.address || 'zakaz topilmadi' }}</td>
                            <td class="px-4 py-3">{{ item?.order_id?.target_address }}</td>
                            <td class="px-4 py-3">{{ item?.order_id?.description }}</td>
                            <td class="px-4 py-3">
                                <div v-if="item?.order_id?.status == '1'" class="bg-blue-600 px-3 text-white rounded-2xl py-[5px] text-center">bajarilmagan- [1]</div>
                                <div v-if="item?.order_id?.status == '2'" class="bg-green-600 px-3 text-white rounded-2xl py-[5px] text-center">bajarilyapti- [2]</div>
                                <div v-if="item?.order_id?.status == '3'" class="bg-orange-600 px-3 text-white rounded-2xl py-[5px] text-center">forse major- [3]</div>
                            </td>
                            <td class="px-4 py-3">
                                <button
                                    class="bg-red-600 px-3 py-1 text-white rounded-2xl focus:ring-2"
                                    @click="store.deleteDelivery(item?._id)"
                                >
                                    Delete
                                </button>
                            </td>
                            <td class="px-4 py-3">
                                <button
                                    class="bg-blue-600 px-3 py-1 text-white rounded-2xl focus:ring-2"
                                    @click="()=> changeShowModal({order_id: item?.order_id?._id, status: item.status})"
                                >
                                    Ozgartirish
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
