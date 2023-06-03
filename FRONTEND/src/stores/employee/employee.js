import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { employee } from '../../service/empolyee'

export const useEmployeeStore = defineStore('employee', () => {
  const state = reactive({ list: [], load: true, message: '' })
  const setList = (users) => {
    state.list = users
  }

  const LIST = computed(() => state.list)

  const listUpdate = () => {
    employee.list()
  }

  return { state, setList, LIST, listUpdate }
})
