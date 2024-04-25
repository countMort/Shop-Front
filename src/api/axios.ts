import axios, { AxiosResponse } from "axios"
import { base_url } from "../params/index.params"
import { MindleResponse } from "../types/api.types"
import { toast } from "react-toastify"

export const Axios = axios.create({
  baseURL: base_url,
})

Axios.interceptors.response.use(
  (response: AxiosResponse<MindleResponse>) => {
    const message = response.data.message
    if (message) {
      toast(message)
    }
    return response.data.results
  },
  (err) => {
    const message = err.response?.data?.message || err.message
    if (message) {
      toast(message, { type: "error" })
    }
    throw err
  }
)

Axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken")

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
