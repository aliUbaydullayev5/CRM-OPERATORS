import axios from '../axios/axios'

export const order = {
    create: (user) => axios.post('/orders', user, {
        headers: {
            Authorization: `Bearer ${
                localStorage.getItem('token')
            }`
        }
    }),

    list: (num = 1) => axios.get(`orders?page=${num}`, {
        headers: {
            Authorization: `Bearer ${
                localStorage.getItem('token')
            }`
        }
    }),

    delete: (id) => axios.delete(`/orders/${id}`, {
        headers: {
            Authorization: `Bearer ${
                localStorage.getItem('token')
            }`
        }
    }),
    randomContact: () => axios.get('/contacts/get/random-contact', {
        headers: {
            Authorization: `Bearer ${
                localStorage.getItem('token')
            }`
        }
    }),
    addOrder: (db) => axios.post('/orders', db,{
        headers: {
            Authorization: `Bearer ${
                localStorage.getItem('token')
            }`
        }
    })
}
