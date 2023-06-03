import axios from '../axios/axios'

export const category = {
    create: (type) => axios.post('/categories', type, {
        headers: {
            Authorization: `Bearer ${
                localStorage.getItem('token')
            }`
        }
    }),

    list: () => axios.get('/categories', {
        headers: {
            Authorization: `Bearer ${
                localStorage.getItem('token')
            }`
        }
    }),

    update: (id, param) => axios.patch(`/categories/${id}`, param, {
        headers: {
            "Authorization": `Bearer ${
                localStorage.getItem('token')
            }`
        }
    }),


    delete: (id) => 
        axios.delete(`/categories/${id}`, {
            headers: {
                "Authorization": `Bearer ${
                    localStorage.getItem('token')
                }`
            }
        })
    
}
