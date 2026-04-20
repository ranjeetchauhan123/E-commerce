import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { CiUser } from "react-icons/ci";

const Profile = () => {

    const [profile, setProfile] = useState({})


    useEffect(() => {
        const handleProfile = async () => {
            try {
                let res = await fetch('http://localhost:3000/profile', {
                    method: "GET",
                    headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                if (res.status === 401 || res.status === 403) {
                    const refreshRes = await fetch('http://localhost:3000/refresh-token', {
                        method: 'POST',
                        headers: { authorization: `Bearer ${localStorage.getItem('refToken')}` },
                    });
                    const refreshData = await refreshRes.json();
                    localStorage.setItem('token', refreshData.accessToken);

                    res = await fetch('http://localhost:3000/profile', {
                        method: "GET",
                        headers: { authorization: `Bearer ${refreshData.accessToken}` }
                    });
                }
                const data = await res.json();
                setProfile(data);
                if (data.profile) {
                    localStorage.setItem('image', JSON.stringify(data.profile.image));
                }

                // const logoutApi = await fetch('http://localhost:3000/logout',{
                //     method : 'GET',
                //     headers: { authorization: `Bearer ${refreshData.accessToken}` }
                // })
                // const logoutData =await logoutApis.json()
            } catch (err) {
                console.log("Error:", err);
            }
        };
        handleProfile();
    }, []);

    return (
        <div className="absolute right-4 top-16 z-50">
            <div className="bg-white w-72 rounded-2xl shadow-lg border border-gray-200 p-6">
                {/* Profile Image */}
                <div className="flex justify-center">
                    {
                        profile.profile ? <img src={`http://localhost:3000/profile/${profile?.profile?.image}`} alt="profile"
                            className="w-24 h-24 rounded-full border-4 border-indigo-100 shadow-sm" />
                            : <CiUser />
                    }

                </div>
                {/* User Info */}
                <div className="text-center mt-4">
                    <h1 className="text-xl font-semibold text-gray-800"> {profile?.profile ? profile.profile.name : null}</h1>
                    <p className="text-gray-500 text-sm"> {profile.profile ? profile.profile.profession : 'developer'} </p>
                </div>
                {/* Divider */}
                <hr className="my-5 border-gray-200" />
                {/* Menu */}
                <ul className="space-y-3">
                    <li>
                        <Link to={`/update-profile/${profile?.profile?._id}`} className="block w-full text-center bg-gray-100 hover:bg-indigo-50 
                ext-gray-700 py-2 rounded-lg transition">   Update Profile   </Link>
                    </li>
                    <li>
                        <Link to="/login" className="block w-full text-center bg-gray-100 hover:bg-indigo-50
                text-gray-700 py-2 rounded-lg transition"> Login </Link>
                    </li>
                    <li>
                        <Link to="/logout">
                            <button className="w-full bg-red-500 hover:bg-red-400 text-white py-2 rounded-lg transition">
                                Logout
                            </button>
                        </Link>

                    </li>
                </ul>
            </div>
        </div>

    )
}

export default Profile