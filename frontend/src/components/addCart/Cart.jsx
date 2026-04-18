import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar'

function Cart() {

  const [myCart, setMyCart] = useState([])
  const [search, setSearch] = useState('')
  useEffect(() => {
    const handleCart = async () => {
      try {
        const res = await fetch('http://localhost:3000/myCart')
        const data = await res.json()
        setMyCart(data.myCard)
      } catch (err) {
        console.log(err)
      }
    }
    handleCart()
  }, [])

  const deleteCart = async (id) => {
    const res = await fetch(`http://localhost:3000/myCart/${id}`, {
      method: 'DELETE',
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    const data = await res.json()
    alert(`Product delete Successfull ${data.deleteItem.title}`)
  }

  const filterItem = myCart.filter((item) =>
    item?.title?.toLowerCase().includes(search?.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar setSearch={setSearch}/>
      <h1 className="text-3xl font-bold text-center mt-6 text-gray-800"> 🛒 My Cart </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {
          filterItem?.length > 0 ? (
            filterItem.map((item) => (
              <div key={item._id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-4">
                <img src={`http://localhost:3000/upload/${item.image}`} alt={item.title}
                  className="w-full h-40 object-cover rounded-lg" />
                <h2 className="text-lg font-semibold mt-3 text-gray-700"> {item.title} </h2>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2"> {item.description} </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-green-600 font-bold text-lg"> ₹{item.price} </span>
                  <button onClick={() => deleteCart(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500 text-lg">
              Cart is empty
            </p>
          )
        }
      </div>
    </div>
  )
}

export default Cart