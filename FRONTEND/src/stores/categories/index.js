import {computed, reactive} from 'vue'
import { defineStore } from 'pinia'
import { category } from '../../service/category'

export const useCategories = defineStore('products', () => {
  const state = reactive({ list: [], productList: [], load: true, message: '' })

  const setList = (categor) => {
    state.list = categor
  }

  const LIST = computed(() => state.list)
  const productLIST = computed(() => state.productList)

  const listUpdate = () => {
    category.list()
  }

  const productListUpdate = () => {}

  return { state, setList, LIST, listUpdate, productLIST, productListUpdate }
})
