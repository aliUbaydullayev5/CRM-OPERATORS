import axios from '../axios/axios'

export const contact = {
    create: async (db) => await axios.post('/contacts', db, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }),
    list: async (e) => await axios.get(`/contacts?page=${e}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }),
    delete: async (id) =>
        await axios.delete(`/contacts/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }),
    exelFile: async (db) => await axios.post('/contacts/upload/byexcel', db, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }),
}
