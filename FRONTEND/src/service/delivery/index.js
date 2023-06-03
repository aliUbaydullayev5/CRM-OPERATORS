import axios from '../axios/axios'

export const delivery = {
    create: async (db) =>
        await axios.post('/order-delivery', db, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }),
    list: async () =>
        await axios.get(`/order-delivery`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }),

    delete: async (id) =>
        await axios.delete(`/order-delivery/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }),
    update: async ({id, data}) =>
        await axios.patch(`/orders/${id}`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }),
}
