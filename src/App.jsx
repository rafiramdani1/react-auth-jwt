import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './app/components/Home'
import Login from './app/components/auth/Login'
import Register from './app/components/auth/Register'
import VerifyEmail from './app/components/auth/VerifyEmail'
import Admin from './app/components/admin/Admin'
import Public from './app/components/Public'
import PageNotFound from './app/components/PageNotFound'

function App() {

  return (
    <div className='font-URL'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/api/auth/user/verify/:id/:token' element={<VerifyEmail />} />
          <Route path='/public' element={<Public />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
