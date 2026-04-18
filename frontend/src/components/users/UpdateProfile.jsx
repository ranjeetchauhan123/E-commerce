import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateProfile = () => {

    const [updateData, setUpdateData] = useState({
        name: '',
        profession: '',
        image: null
    })

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const handleNavigate = async () => {
            const res = await fetch(`http://localhost:3000/navigate-profile/${id}`, {
                method: 'GET'
            })
            const data = await res.json()
            console.log(data.data)
            setUpdateData(data.data)
        }
        handleNavigate()
    }, [id])


    const handleUpdate = async (e) => {
        e.preventDefault()

        const dataToSend = new FormData();
        dataToSend.append("name", updateData.name);
        dataToSend.append("profession", updateData.profession);
        if (updateData.image) {
            dataToSend.append("profileImage", updateData.image);
        }

        const res = await fetch(`http://localhost:3000/update-profile/${id}`, {
            method: 'PUT',
            // headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
            body: dataToSend
        })
        const data = await res.json()
        if (data.success === true) {
            navigate("/profile");
        } else {
            alert("Update failed");
        }
    }

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-800 text-center mb-5"> UpdateProfile </h2>
                {/* Form */}
                <form onSubmit={handleUpdate} className="space-y-4">

                    {/* Name */}
                    <div className="flex gap-2">
                        <input type="text" placeholder="name.." name="name" value={updateData.name}
                            onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400" />
                    </div>

                    {/* profession */}
                    <input type="text" placeholder="profession" name="name" value={updateData.profession}
                        onChange={(e) => setUpdateData({ ...updateData, profession: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400" />

                    {/* Profile Image*/}
                    <input type="file" name="profile-image" onChange={(e) => setUpdateData({ ...updateData, image: e.target.files[0] })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400" />

                    {/* Button */}
                    <button type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition">
                        Change profession
                    </button>
                    <div>

                    </div>

                </form>
            </div>
        </div>
    )
}

export default UpdateProfile;