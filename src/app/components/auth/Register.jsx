import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faInfoCircle, faL } from '@fortawesome/free-solid-svg-icons'
import AlertSuccess from '../layouts/AlertSuccess'
import AlertErrors from '../layouts/AlertErrors'
import LoadingSpinner from '../layouts/LoadingSpinner'

const USERNAME_REGEX = /^(?=.{4,})/
const EMAIL_REGEX = /^.+@.+\..+$/
const PASSWORD_REGEX = /^(?=.*\d).{6,}$/

const Register = () => {

  const usernameRef = useRef()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [validUsername, setValidUsername] = useState(false)
  const [usernameFocus, setUsernameFocus] = useState(false)

  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)

  const [validPassword, setValidPassword] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)

  const [validConfirmPassword, setValidConfirmPassword] = useState(false)
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setErrorMessage('')
    setFormData({ ...formData, [name]: value })
  }

  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  useEffect(() => {
    setValidUsername(USERNAME_REGEX.test(formData.username))
  }, [formData.username])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(formData.email))
  }, [formData.email])

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(formData.password))
    setValidConfirmPassword(formData.password === formData.confirmPassword)
  }, [formData.password, formData.confirmPassword])

  useEffect(() => {
    setErrorMessage('')
  }, [formData.username, formData.email, formData.password, formData.confirmPassword])

  const handleOnSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', formData, {
        headers: { 'Content-Type': 'application/json' }
      })
      setSuccessMessage(response.data.msg)
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
      setTimeout(() => {
        setSuccessMessage('')
        navigate('/login')
      }, 5000)
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.msg)
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
                Buat Akun
              </h1>

              {successMessage && <AlertSuccess msg={successMessage} close={() => setSuccessMessage('')} />}
              {errorMessage && <AlertErrors msg={errorMessage} close={() => setErrorMessage('')} />}

              <form onSubmit={handleOnSubmit} className="space-y-4 md:space-y-6" action="#">

                <div>
                  <label
                    className="block mb-2 text-textSecondary text-sm font-medium">Username
                    <FontAwesomeIcon icon={faCheck} className={validUsername ? 'ml-2 text-green-500 font-bold text-lg' : 'hidden'} />
                    <FontAwesomeIcon icon={faTimes} className={validUsername || !formData.username ? 'hidden' : 'text-red-500 ml-2 font-bold text-lg'} />
                  </label>
                  <input
                    type="username"
                    name="username"
                    className="bg-gray-50 border border-gray-300 text-textPrimary sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="username"
                    required
                    value={formData.username}
                    onChange={handleInputChange}
                    ref={usernameRef}
                    autoComplete='off'
                    onFocus={() => setUsernameFocus(true)}
                  />
                  <p className={usernameFocus && formData.username && !validUsername ? 'text-red-500 text-xs font-medium ml-1 mt-1' : 'hidden'}>username minimal 4 karakter</p>
                </div>

                <div>
                  <label className="block mb-2 text-textSecondary text-sm font-medium">Email
                    <FontAwesomeIcon icon={faCheck} className={validEmail ? 'ml-2 text-green-500 font-bold text-lg' : 'hidden'} />
                    <FontAwesomeIcon icon={faTimes} className={validEmail || !formData.email ? 'hidden' : 'text-red-500 ml-2 font-bold text-lg'} />
                  </label>
                  <input type="email" name="email"
                    className="bg-gray-50 border border-gray-300 text-textPrimary sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="youremail@company"
                    autoComplete='off'
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    onFocus={() => setEmailFocus(true)}
                  />
                  <p className={emailFocus && formData.email && !validEmail ? 'text-red-500 text-xs font-medium ml-1 mt-1' : 'hidden'}>email tidak valid</p>
                </div>

                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-textSecondary">Password
                    <FontAwesomeIcon icon={faCheck} className={validPassword ? 'ml-2 text-green-500 font-bold text-lg' : 'hidden'} />
                    <FontAwesomeIcon icon={faTimes} className={validPassword || !formData.password ? 'hidden' : 'text-red-500 ml-2 font-bold text-lg'} />
                  </label>
                  <input type="password" name="password" placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-textPrimary sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    onFocus={() => setPasswordFocus(true)}
                  />
                  <p className={passwordFocus && formData.password && !validPassword ? 'text-red-500 text-xs font-medium ml-1 mt-1' : 'hidden'}>minimal 6 karakter, harus terdapat angka</p>
                </div>

                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-textSecondary">Konfirmasi Password
                    <FontAwesomeIcon icon={faCheck} className={validConfirmPassword && confirmPasswordFocus ? 'ml-2 text-green-500 font-bold text-lg' : 'hidden'} />
                    <FontAwesomeIcon icon={faTimes} className={validConfirmPassword || !formData.confirmPassword ? 'hidden' : 'text-red-500 ml-2 font-bold text-lg'} />
                  </label>
                  <input type="password" name="confirmPassword" placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-textPrimary sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    onFocus={() => setConfirmPasswordFocus(true)}
                  />
                  <p className={confirmPasswordFocus && formData.confirmPassword && !validConfirmPassword ? 'text-red-500 text-xs font-medium ml-1 mt-1' : 'hidden'}>konfirmasi password tidak sama</p>
                </div>

                <button type="submit"
                  className={`w-full font-medium text-textPrimary border border-borderButton focus:ring-2 focus:outline-none focus:ring-ringFocusBtn rounded-lg text-sm px-5 py-2.5 text-center mt-5 ${!validUsername || !validEmail || !validPassword || !validConfirmPassword ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-hoverBgButton hover:text-white'}`}
                  disabled={!validUsername || !validEmail || !validPassword || !validConfirmPassword ? true : false}
                >Daftar</button>

                <p className="text-sm font-light text-gray-500 text-center">
                  sudah punya akun? <Link to={'/login'}
                    className="font-medium text-primary-600 hover:underline" target="">Masuk</Link>
                </p>

              </form>
            </div>
          </div>
        </div>
      </section >
    </>
  )
}

export default Register