import {defineStore} from "pinia"
import {computed, reactive} from "vue"
import {toast} from "vue3-toastify"
import {order} from "@/service/order"

export const useOrderStore = defineStore('useOrderStore', ()=> {
    const state = reactive({
        data: [],
        status: null,
        page: 1,
        countPages: [],
        randomContact: '',
        randomContactStatus: null,
        addOrderStatus: null
    })

    const LIST = computed(()=> state.data)

    const getOrders = async (e)=> {
        state.status = 'loading'
        try {
            const res = await order.list(e)
            state.data = await res.data.data
            state.status = 'success'
        }catch (e) {
            console.error(e)
            state.status = 'error'
        }
    }

    const postOrder = async (newProduct) => {
        try {
            await order.create(newProduct)
                .then((res)=> {
                    if(res.data.success) {
                        getOrders(state.page)
                        toast.success("Yangi product muaffaqiyatli qo'shildi")
                    }
                })
        }catch (e) {
            console.error(e)
            toast.success("Error Post")
        }
    }


    const deleteOrder = async (id) => {
        try {
            await order.delete(id)
                .then((res)=> {
                    if(res.data.success) {
                        getOrders(state.page)
                        toast.success("product muaffaqiyatli ochirildi")
                    }
                })
        }catch (e){
            toast.success("Error Delete")
            console.error(e)
        }
    }

    const randomContact = async () => {
        try {
            state.randomContactStatus = 'loading'
            await order.randomContact()
                .then((res)=> {
                    if(res.data.success){
                        state.randomContactStatus = 'success'
                        state.randomContact = res.data.data
                    }
                })
        }catch (e) {
            console.error(e)
            toast.error(e)
            state.randomContactStatus = 'error'
        }
    }

    const addOrder = async (data) => {
        try {
            state.addOrderStatus = 'loading'
            await order.addOrder(data)
                .then((res)=> {
                    if(res.data.success) {
                        state.addOrderStatus = 'success'
                        getOrders(state.page)
                    }
                })
        }catch (err){
            console.error(err)
            state.addOrderStatus = 'error'
            toast.error(err.message)
        }
    }

    return {
        state,
        LIST,
        getOrders,
        postOrder,
        deleteOrder,
        randomContact,
        addOrder
    }
})


