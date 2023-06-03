import axios from '../axios/axios'

export const products = {
  create: async (db) =>
      await axios.post('/products', db, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }),
  list: async (e) =>
      await axios.get(`/products?page=${e}&sort_by=name&order_by=desc`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }),

  delete: async (id) =>
      await axios.delete(`/products/${id}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
}
