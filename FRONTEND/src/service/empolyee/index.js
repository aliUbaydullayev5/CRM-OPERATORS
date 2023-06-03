import axios from '../axios/axios'

export const employee = {
    create: (user) => axios.post('/staff/auth/signup', user, {
        headers: {
            Authorization: `Bearer ${
                localStorage.getItem('token')
            }`
        }
    }),

    list: (num = 1) => axios.get(`/staff?page=${num}`, {
        headers: {
            Authorization: `Bearer ${
                localStorage.getItem('token')
            }`
        }
    }),

    deliveryList: () => axios.get(`/staff/search/deliveryman`, {
        headers: {
            Authorization: `Bearer ${
                localStorage.getItem('token')
            }`
        }
    }),

    delete: (id) => axios.delete(`/staff/${id}`, {
        headers: {
            Authorization: `Bearer ${
                localStorage.getItem('token')
            }`
        }
    }),

    statusUpdate: (user) => axios.post(`/staff/activate`,user, {
      headers: {
          Authorization: `Bearer ${
              localStorage.getItem('token')
          }`
      }
    })



}
