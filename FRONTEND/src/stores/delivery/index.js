import {defineStore} from "pinia"
import {computed, reactive} from "vue"
import {toast} from "vue3-toastify"
import {delivery} from "@/service/delivery"

export const useDeliveryStore = defineStore('useDeliveryStore', ()=> {
    const state = reactive({
        data: [],
        status: null,
        addStatus: null,
        updateStatus: null
    })

    const LIST = computed(()=> state.data)

    const getDelivery = async ()=> {
        try {
            state.status = 'loading'
            await delivery.list()
                .then((res)=> {
                    if(res.data.success){
                        state.data = res.data.data
                        state.status = 'success'
                    }
                })
        }catch (e) {
            console.error(e)
            state.status = 'error'
            toast.error(e.message)
        }
    }

    const deleteDelivery = async (id) => {
        try{
            await delivery.delete(id)
                .then((res)=> {
                    if(res.data.success){
                        getDelivery()
                        toast.success('Deliver muvofiyaqatli ochirildi')
                    }
                })
        }catch (err){
            console.error(err)
            toast.error(`delete error: ${err.message}`)
        }
    }

    const addDelivery = async (data) => {
        try{
            state.addStatus = 'loading'
            await delivery.create(data)
                .then((res)=> {
                    if(res.data.success){
                        toast.success('Muvofiyaqatli qoshildi')
                        state.addStatus = 'success'
                    }
                })
        }catch (err){
            console.error(err)
            toast.error(`post error: ${err.message}`)
            state.addStatus = 'error'
        }
    }

    const putDelivery = async ({id, data}) => {
        console.log(id, data, 'dashrtgfrddghujthygtefrd')

        try {
            state.updateStatus = 'loading'
            await delivery.update({id, data})
                .then((res)=> {
                    if(res.data.success){
                        getDelivery()
                        state.updateStatus = 'success'
                        toast.success('Muvofiyaqatli ozgartirildi')
                    }
                })
        }catch (err){
            console.error(err)
            state.updateStatus = 'error'
            toast.error(err.message)
        }
    }


    return {
        state,
        LIST,
        getDelivery,
        deleteDelivery,
        addDelivery,
        putDelivery
    }
})


