import {defineStore} from "pinia"
import {computed, reactive} from "vue"
import {contact} from "@/service/contact"
import {toast} from "vue3-toastify"

export const useContactStore = defineStore('useContactStore', ()=> {
    const state = reactive({
        data: [],
        status: null,
        page: 1,
        countPages: [],
        pageInfo: {}
    })

    const LIST = computed(()=> state.data)

    const getContact = async (e)=> {
        state.status = 'loading'
        try {
            const res = await contact.list(e)
            state.data = await res.data.data.records
            state.status = 'success'
            state.page = res.data.data.pagination.currentPage
            state.pageInfo = res.data.data.pagination
            if(res.status === 200){
                let countPages = []
                for (let i = 1; i <= res?.data?.data?.pagination?.totalPages; i++) countPages.push(i)
                state.countPages = countPages
            }
        }catch (e) {
            console.error(e)
            state.status = 'error'
        }
    }
    const postContact = async (newProduct) => {
        try {
            await contact.create(newProduct)
                .then((res)=> {
                    if(res.data.success) {
                        getContact(state.page)
                        toast.success("Yangi contact muaffaqiyatli qo'shildi")
                    }
                })
        }catch (e) {
            console.error(e)
            toast.success("Error Post")
        }
    }

    const deleteContact = async (id) => {
        try {
            await contact.delete(id)
                .then((res)=> {
                    if(res.data.success) {
                        getContact(state.page)
                        toast.success("product muaffaqiyatli ochirildi")
                    }
                })
        }catch (e){
            toast.success("Error Delete")
            console.error(e)
        }
    }

    const uploadExelFile = async (data) => {
        try {
            await contact.exelFile(data)
                .then((res)=> {
                    if(res.data.success) {
                        getContact(state.page)
                        toast.success("Yangi contactlar muaffaqiyatli qo'shildi")
                    }
                })
        }catch (e) {
            console.error(e)
            toast.warning("Error Post")
        }
    }


    return {
        state,
        LIST,
        getContact,
        deleteContact,
        postContact,
        uploadExelFile
    }
})


