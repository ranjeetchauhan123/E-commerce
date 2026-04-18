import React, { useState, useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import { Link } from 'react-router-dom'

function Products() {
    const [product, setProduct] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        const getData = async () => {
            const res = await fetch('http://localhost:3000/', {
                method: 'GET',
                headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            const data = await res.json()
            setProduct(data.products)
        }
        getData()
    }, [])

    const deleteProduct = async (id) => {
        const res = await fetch(`http://localhost:3000/delete/${id}`, {
            method: 'DELETE',
            headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        const data = await res.json()
        console.log(`Product delete Successfull ${data}`)
    }

    const myCart = async (item) => {
        const res = await fetch(`http://localhost:3000/cart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: item._id,
                title: item.title,
                description: item.description,
                price: item.price,
                image: item.image
            })
        })
        const data = await res.json()
        console.log(data)
    }

    const filterItem = product.filter((item) =>
        item?.title?.toLowerCase().includes(search?.toLowerCase())
    );
    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar setSearch={setSearch} />
            <div className="max-w-7xl mx-auto px-4 py-6">
                {filterItem?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filterItem.map((item, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4">
                                <div className="flex justify-between items-center">
                                    <button onClick={() => deleteProduct(item._id)}> X </button>
                                    <Link to={`/ update - product / ${item._id}`}> Edit</Link>
                                </div>
                                {/* Image */}
                                < div className="h-40 flex items-center justify-center mb-4" >
                                    <img src={`http://localhost:3000/upload/${item.image}`} alt={item.image} className="h-full object-contain" /></div>
                                {/* Title */}
                                < h2 className="text-md font-semibold text-gray-800 line-clamp-1" > {item.title}</h2 >
                                {/* Description */}
                                < p className="text-sm text-gray-500 mt-1 line-clamp-2" > {item.description}</p >
                                {/* Price */}
                                < h3 className="text-lg font-bold text-indigo-600 mt-3" > ₹ {item.price}</h3 >
                                {/* Button */}
                                <button onClick={() => myCart(item)}
                                    className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition">
                                    Add to Cart
                                </button>
                            </div >
                        ))
                        }
                    </div >
                ) : (
                    <p className="text-gray-500">Loading Products...</p>
                )
                }
            </div >
        </div >
    )
}

export default Products