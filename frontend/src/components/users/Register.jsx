import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {

    const [mail, setMail] = useState("")
    const [userData, setUserData] = useState("")
    const [showMessage, setShowMessage] = useState({})
    const navigate = useNavigate()

    const handleMail = async () => {
        const res = await fetch('http://localhost:3000/gererate-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: mail.name,
                email: mail.email
            })
        })
        const data = await res.json()
        setShowMessage(data)
    }

    const handleRegisterd = async (e) => {
        e.preventDefault()

        const newdata = new FormData();
        newdata.append("email", userData.email);
        newdata.append("otp", userData.otp);
        newdata.append("password", userData.password);
        newdata.append("profession", userData.profession);
        newdata.append("profileImage", userData.image);


        const res = await fetch('http://localhost:3000/verify-otp', {
            method: 'POST',
            body: newdata
        })
        const data = await res.json()
        setShowMessage(data.message)
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
                <h2 className="text-xl font-semibold text-gray-800 text-center mb-5"> Create Account </h2>
                {/* Form */}
                <form onSubmit={handleRegisterd} encType='multipart/form-data' className="space-y-4">
                    {/* Name */}
                    <input type="text" placeholder="Full Name" onChange={(e) => setMail({ ...mail, name: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400" />

                    {/* Email + OTP Button */}
                    <div className="flex gap-2">
                        <input type="email" placeholder="Email" onChange={(e) => {
                            setMail({ ...mail, email: e.target.value })
                            setUserData({ ...userData, email: e.target.value })
                        }}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400" />
                        <button type="button" onClick={handleMail}
                            className="whitespace-nowrap bg-indigo-600 text-white px-3 rounded-lg hover:bg-indigo-500 transition">
                            Send OTP
                        </button>
                    </div>
                    {/* OTP */}
                    <input type="text" placeholder="Enter OTP" onChange={(e) => setUserData({ ...userData, otp: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400" />
                    {/* Password */}
                    <input type="password" placeholder="Password" onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400" />
                        {/* your profession */}

                        <input type="text" placeholder="your Profession..." onChange={(e) => setUserData({ ...userData, profession: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400" />
                    {/* Image Upload */}
                    <input type="file" name="profile-image" onChange={(e) => setUserData({ ...userData, image: e.target.files[0] })}
                        className="w-70 text-sm border border-2xl p-2" />
                    <p>i have already an account <Link to="/login" className="text-green-600"> click here </Link></p>
                    {/* Button */}
                    <button type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition" >
                        Register Now
                    </button>

                    <div>
                        <p className={`${showMessage.success ? 'text-green-600' : 'text-red-600'}`}>
                            {showMessage.message}
                        </p>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Register;