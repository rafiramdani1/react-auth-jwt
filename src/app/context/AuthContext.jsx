import React, { createContext, useContext, useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null)

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/auth/token')
      if (response.status !== 204 && response.data) {
        const decode = jwtDecode(response.data.accessToken)
        login({ accessToken: response.data.accessToken, user: decode })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const axiosRefresh = axios.create()
  axiosRefresh.interceptors.request.use(async (config) => {
    const currentDate = new Date()
    if (auth.user.exp * 1000 < currentDate.getTime()) {
      const response = await refreshToken()
      login(response.data.accessToken)
      config.headers.Authorization = `Bearer ${response.data.accessToken}`
    }
    return config
  }, (error) => {
    return Promise.reject(error)
  })

  const login = (data) => {
    setAuth(data)
  }

  const logout = () => {
    setAuth(null)
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout, refreshToken, axiosRefresh }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext