import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import AlertErrors from '../layouts/AlertErrors'
import LoadingSpinner from '../layouts/LoadingSpinner'
import jwtDecode from 'jwt-decode'
import { useAuth } from '../../context/AuthContext'

const Login = () => {

  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState('')
  const [loading, setLoading] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setErrors('')
    setFormData({ ...formData, [name]: value })
  }

  const handleOnSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', formData, {
        headers: { 'Content-Type': 'application/json' }
      })
      const decode = jwtDecode(response.data.accessToken)
      login({ accessToken: response.data.accessToken, user: decode })
      setFormData({ email: '', password: '' })
      navigate('/')
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.msg)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading ? <LoadingSpinner /> : null}
      <section className="bg-gray-100">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

              <h1 className="text-xl font-bold leading-tight tracking-tight text-textSecondary text-center">
                Masuk
              </h1>

              {errors && <AlertErrors msg={errors} close={() => setErrors('')} />}

              <form onSubmit={handleOnSubmit} className="space-y-4 md:space-y-6">

                <div>
                  <label className="block mb-2 text-textSecondary text-sm font-medium">
                    Email anda</label>
                  <input type="email" name="email" id="email"
                    className="bg-gray-50 border border-gray-300 text-textPrimary sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com" value={formData.email} onChange={handleInputChange} />
                </div>

                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-textSecondary">Password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-textPrimary sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={formData.password} onChange={handleInputChange} />
                </div>

                <div className="flex items-center justify-between">
                  <a href="/forgot-password"
                    className="text-sm font-medium text-primary-600 hover:underline text-textSecondary">Lupa password?</a>
                </div>

                <button type="submit"
                  className="w-full font-medium text-textPrimary hover:text-white hover:bg-hoverBgButton border border-borderButton focus:ring-2 focus:outline-none focus:ring-ringFocusBtn rounded-lg text-sm px-5 py-2.5 text-center mt-5">Masuk</button>

                <p className="text-sm font-light text-gray-500">
                  Belum punya akun? <Link to={'/register'}
                    className="font-medium text-primary-600 hover:underline">Daftar</Link>
                </p>

              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
