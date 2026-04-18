import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ForgatePassword = () => {

    const [forgateData, setForgateData] = useState({})
    const [showMessage, setShowMessage] = useState({})

    const navigate = useNavigate()
    const handleForgate = async (e) => {
        e.preventDefault()
        const res = await fetch('http://localhost:3000/forgate-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: forgateData.email,
                newPass: forgateData.newPass,
                c_newPass: forgateData.c_newPass,
            })
        })
        const data = await res.json()
        setShowMessage(data)
        console.log(data);
        if (data.success === true) {
            setTimeout(() => {
                navigate('/login')
            }, 1000)
        }
    }
    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-800 text-center mb-5"> Forgate Password </h2>
                {/* Form */}
                <form onSubmit={handleForgate} className="space-y-4">

                    {/* Email */}
                    <div className="flex gap-2">
                        <input type="email" placeholder="Email" onChange={(e) => setForgateData({ ...forgateData, email: e.target.value })}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400" />
                    </div>

                    {/* Password */}
                    <input type="password" placeholder="new Password" name="newPass" onChange={(e) => setForgateData({ ...forgateData, newPass: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400" />

                    {/* confirm Password */}
                    <input type="password" name="c_newPass" placeholder=" confirm new Password" onChange={(e) => setForgateData({ ...forgateData, c_newPass: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400" />

                    {/* Button */}
                    <button type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition">
                        Change Password
                    </button>
                    <div>
                        {
                            showMessage ?
                                <p className={showMessage.success === true ? 'text-green-600' : 'text-red-600'}>
                                    {showMessage.message}</p>
                                : null
                        }
                    </div>

                </form>
            </div>
        </div>
    )
}

export default ForgatePassword;