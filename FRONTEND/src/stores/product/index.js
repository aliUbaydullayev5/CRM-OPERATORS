import {defineStore} from "pinia"
import {computed, reactive} from "vue"
import {products} from "@/service/product"
import {toast} from "vue3-toastify"

export const useProductStore = defineStore('useProductStore', ()=> {
    const state = reactive({
        data: [],
        status: null,
        deleteStatus: null,
        postStatus: null,
        page: 1,
        countPages: [],
        pageInfo: {},
    })

    const LIST = computed(()=> state.data)

    const getProduct = async (e)=> {
        state.status = 'loading'
        try {
            const res = await products.list(e)
            state.data = res.data?.data?.records
            state.status = 'success'
            state.pageInfo = res?.data?.data.pagination
            if(res.status === 200){
                state.page = res.data?.data?.pagination?.currentPage
                let countPages = []
                for (let i = 1; i <= res?.data?.data?.pagination?.totalPages; i++) countPages.push(i)
                state.countPages = countPages
            }
        }catch (e) {
            console.error(e.message)
            state.status = 'error'
        }
    }

    const postProduct = async (newProduct) => {
        state.postStatus = 'loading'
        try {
            await products.create(newProduct)
                .then((res)=> {
                    if(res.data.success) {
                        getProduct(state.page)
                        toast.success("Yangi product muaffaqiyatli qo'shildi")
                        state.postStatus = 'success'
                    }
                })
        }catch (e) {
            console.error(e)
            toast.error(`Error Post: ${e.message}`)
            state.postStatus = 'error'
        }
    }

    const deleteProduct = async (id) => {
        state.deleteStatus = 'loading'
        try {
            await products.delete(id)
                .then((res)=> {
                    if(res.data.success) {
                        getProduct(state.page)
                        state.deleteStatus = 'success'
                        toast.success("product muaffaqiyatli ochirildi")
                    }
                })
        }catch (e){
            toast.success(`Error Delete: ${e.message}`)
            console.error(e)
            state.deleteStatus = 'error'
        }
    }

    return {
        state,
        LIST,
        getProduct,
        postProduct,
        deleteProduct
    }
})


