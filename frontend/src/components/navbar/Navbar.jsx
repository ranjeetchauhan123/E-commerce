import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { CiUser } from "react-icons/ci";

function Navbar({setSearch}) {

  const image = JSON.parse(localStorage.getItem('image'))
  return (
    <nav className="bg-gray-100 border-b border-gray-300 px-6 py-3 shadow-sm">
      <div className="flex items-center justify-between">

        {/* Logo */}
        <h2 className="text-2xl font-semibold text-indigo-600 cursor-pointer"> MiniProject </h2>

        {/* Search */}
        <div onChange={(e)=>setSearch(e.target.value)}
        className="hidden md:flex items-center bg-white rounded-full px-4 py-2 w-1/3">
          <input type="search" placeholder="Search products..."
            className="bg-transparent outline-none text-sm w-full placeholder-gray-white" />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-indigo-600 transition"> Products </Link>
          <Link to="/upload-product" className="hover:text-indigo-600 transition"> Upload Product </Link>
          <Link to="/cart" className="hover:text-indigo-600 transition"> My Cart </Link>
        </div>

        {/* Profile */}
        <div>
          <Link to='/profile'>
            {
              image ? <img src={`http://localhost:3000/profile/${image}`} alt="profile"
                className="w-10 h-10 rounded-full border border-gray-300 hover:ring-2 hover:ring-indigo-400 transition" />
                : <CiUser />
            }

          </Link>
          <Outlet />
        </div>
      </div>
    </nav>
  )
}

export default Navbar