import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import axios from 'axios'

const VerifyEmail = () => {

  const { id, token } = useParams()
  const navigate = useNavigate()
  const [success, setSuccess] = useState('')
  const [errors, setErrors] = useState('')

  useEffect(() => {
    const verifyEmailVerification = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/auth/user/verify/${id}/${token}`)
        setSuccess(response.data.msg)
        setTimeout(() => {
          navigate('/login')
        }, 4000)
      } catch (error) {
        if (error.response) {
          setErrors(error.response.data.msg)
        }
      }
    }
    verifyEmailVerification()
  }, [])

  return (
    <>
      {success && (
        <div className="bg-teal-100 border border-teal-400 text-teal-700 px-4 py-3 rounded relative text-center" role="alert">
          <strong className="font-bold">{success}</strong>
          <Link to='/login'>
            <button className='text-teal-700 hover:text-teal-800 font-medium underline text-center ml-2'><strong>Login</strong></button>
          </Link>
        </div>
      )}
      {errors && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center" role="alert">
          <strong className="font-bold">{errors}</strong>
        </div>
      )}
    </>
  )
}

export default VerifyEmail