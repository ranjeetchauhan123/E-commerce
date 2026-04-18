import React from "react";
import { Link , useNavigate} from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate()

    const handleLogout = async ()=>{
        const res = await fetch('http://localhost:3000/logout',{
            method : 'POST',
            headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        if(res.ok){
            localStorage.removeItem('image');
            setTimeout(()=>{
                navigate('/login')
            }, 1000)            
        }        
    }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-40">      
      <div className="bg-white p-6 rounded-2xl shadow-lg w-80 text-center">        
        <h2 className="text-lg font-semibold mb-4"> Are you sure you want to logout? </h2>
        <div className="flex justify-center gap-4">          
          {/* Yes Button */}
          <button onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg" > Yes </button>
          {/* No Button */}

          <Link to="/profile">
          <button
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"> No </button>
          </Link>   

        </div>
      </div>

    </div>
  );
};

export default Logout;