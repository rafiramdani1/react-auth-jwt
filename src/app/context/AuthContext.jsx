import React, { createContext, useContext, useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null)

  const login = (data) => {
    setAuth(data)
  }

  const logout = () => {
    setAuth(null)
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext