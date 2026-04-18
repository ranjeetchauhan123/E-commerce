import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Products from './components/products/Products'
import Cart from './components/addCart/Cart'
import UploadProduct from './components/upload/UploadProduct'
import UpdateProduct from './components/update/UpdateProduct'
import Profile from './components/users/Profile'
import Login from './components/users/Login'
import Register from './components/users/Register'
import Logout from './components/users/Logout'
import ForgatePassword from './components/users/ForgetPassword'
import UpdateProfile from './components/users/UpdateProfile'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Products />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/logout' element={<Logout />} />
          </Route>
          <Route path='/product' element={<Products />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/upload-product' element={<UploadProduct />} />
          <Route path='/update-product/:id' element={<UpdateProduct />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgate-password' element={<ForgatePassword />} />
          <Route path='/register' element={<Register />} />
          <Route path='/update-profile/:id' element={<UpdateProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
