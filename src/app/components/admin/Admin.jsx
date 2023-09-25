import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { useAuth } from '../../context/AuthContext'

const Admin = () => {

  const navigate = useNavigate()
  const { auth, login, refreshToken, axiosRefresh } = useAuth()
  const [showUsers, setShowUsers] = useState(false)
  const [users, setUsers] = useState([])

  useEffect(() => {
    refreshToken()
  }, [])

  const getUsers = async () => {
    setShowUsers(true)
    try {
      const response = await axiosRefresh.get('http://localhost:3001/api/users', {
        headers: { Authorization: `Bearer ${auth.accessToken}` }
      })
      setUsers(response.data.data)
    } catch (error) {
      if (error.response) {
        console.log(error.response)
      }
    }
  }


  return (

    <section className="bg-gray-100 mt-20">
      <div className='flex justify-center items-center'>
        <div className='border-2 bg-white shadow-md p-5 w-1/2'>

          <h1 className="text-xl font-bold leading-tight tracking-tight text-textSecondary text-center mb-5">
            Admin Page
          </h1>

          <div className='text-center'>
            {showUsers ? (
              <button onClick={() => setShowUsers(false)} className='border bg-red-500 hover:bg-red-600 p-2 rounded-md text-white'>Hide Users</button>

            ) : (
              <button onClick={getUsers} className='border bg-blue-500 hover:bg-blue-600 p-2 rounded-md text-white'>Get Users</button>
            )}
          </div>

          {showUsers ? (
            <div className="relative overflow-x-auto mt-3 border">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Username
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr className="bg-white border-b" key={user._id}>
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {user.username}
                      </th>
                      <td className="px-6 py-4">
                        {user.email}
                      </td>
                      <td className="px-6 py-4">
                        {user.roleId.roleName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : ''}


          <div className='text-center mt-4'>
            <Link className='font-medium text-blue-500 hover:text-blue-600' to='/'>{'<-Back Home'}</Link>
          </div>

        </div>
      </div>
    </section>
  )

}

export default Admin