import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate()

  setTimeout(() => {
    navigate('/')
  }, 5000)

  return (
    <section className="bg-gray-100 mt-20">
      <div className='flex justify-center items-center'>
        <div className='border-2 bg-white shadow-md p-5 w-1/2'>

          <h1 className="text-5xl font-bold leading-tight tracking-tight text-textPrimary text-center mb-2">
            404
          </h1>

          <div className='space-y-4 md:space-y-6 text-center'>
            <h1 className='font-semibold text-textSecondary text-xl'>Page Not Found</h1>
          </div>
          <div className='mt-6 text-center'>
            <Link to='/' className='font-normal text-base text-blue-500 hover:text-blue-600'>{'<-Back home'}</Link>
          </div>


        </div>
      </div>
    </section>
  )
}

export default PageNotFound