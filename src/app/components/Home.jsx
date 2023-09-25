import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import jwtDecode from 'jwt-decode'

const Home = () => {

  const { auth, login, logout, refreshToken } = useAuth()

  useEffect(() => {
    refreshToken()
  }, [])

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      await axios.delete('http://localhost:3001/api/auth/logout')
      logout()
    } catch (error) {
      if (error.response) {
        console.log(error.response.data)
      }
    }
  }

  return (
    <section className="bg-gray-100 mt-20">
      <div className='flex justify-center items-center'>
        <div className='border-2 bg-white shadow-md p-5 w-1/2'>

          <h1 className="text-xl font-bold leading-tight tracking-tight text-textSecondary text-center mb-5">
            Home Page
          </h1>

          <div className='space-y-4 md:space-y-6 text-center'>

            {auth ? (
              <>
                <div className='mb-3 tracking-tighter'>
                  <h1 className='text-base font-medium text-textPrimary'>username : {auth.user.username}</h1>
                  <h1 className='text-base font-medium text-textPrimary'>Role : {auth.user.role}</h1>
                </div>

                <Link to='/admin' className='text-blue-500 hover:text-blue-600 mr-2 tracking-tighter hover:underline'>Admin Page</Link>
                <Link to='/public' className='text-blue-500 hover:text-blue-600 mr-2 tracking-tighter hover:underline'>Public Page</Link>

                <div className='mt-3'>
                  <button onClick={handleLogout} className='border bg-red-500 p-2 rounded-md text-white hover:bg-red-600'>Logout</button>
                </div>
              </>
            )
              :
              <Link to='/login' className='border bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600'>Login</Link>
            }
          </div>

        </div>
      </div>
    </section>
  )
}

export default Home