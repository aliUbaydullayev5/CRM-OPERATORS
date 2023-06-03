import axios from '../axios/axios'

export const auth = (params) => {
  return axios.post('/staff/auth/signin', params)
}
