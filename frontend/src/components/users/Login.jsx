import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {

    const [userData, setUserData] = useState('')
    const [showMessage, setShowMessage] = useState({})
    const navigate = useNavigate()

    const handleUserData = async (e) => {
        e.preventDefault()
        const { email, password, c_password } = userData;
        const res = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, c_password })
        })
        const data = await res.json()
        setShowMessage(data)
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('refToken', data.refereshToken);
        if (data.success === true) {
            setTimeout(() => {
                navigate('/')
            }, 1000)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-800 text-center mb-5"> User Login </h2>
                {/* Form */}
                <form onSubmit={handleUserData} className="space-y-4">

                    {/* Email */}
                    <div className="flex gap-2">
                        <input type="email" placeholder="Email" onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400" />
                    </div>

                    {/* Password */}
                    <input type="password" placeholder="Password" onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400" />

                    {/* confirm Password */}
                    <input type="password" name="c_password" placeholder=" confirm Password" onChange={(e) => setUserData({ ...userData, c_password: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400" />

                    <p>create new account<Link to="/register" className="text-green-600"> click here </Link></p>
                    {/* Foragate */}
                    <p className="text-red-600">Foragte Password<Link to="/forgate-password" className="text-green-600"> click here </Link></p>
                    {/* Button */}
                    <button type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition">
                        Login
                    </button>

                    <div>
                        <p className={`${showMessage.success? 'text-green-600' : 'text-red-600'}`}>
                            {showMessage.message}</p>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login