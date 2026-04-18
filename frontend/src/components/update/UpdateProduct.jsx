import { useState, useEffect } from "react";
import { useParams , useNavigate} from "react-router-dom";
import Navbar from "../navbar/Navbar";

function UpdateProduct() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        image: null
    })

    useEffect(() => {
        const handleNavigate = async () => {
            const res = await fetch(`http://localhost:3000/navigate/${id}`)
            const data = await res.json()
            console.log(data)
            setFormData({
                title: data.data.title,
                description: data.data.description,
                price: data.data.price,
                image: null
            })
        }
        handleNavigate()
    }, [id])

    const updateProduct = async (e) => {
        e.preventDefault()

        const dataToSend = new FormData();
        dataToSend.append("title", formData.title);
        dataToSend.append("description", formData.description);
        dataToSend.append("price", formData.price);

        if (formData.image) {
            dataToSend.append("image", formData.image);
        }
        const res = await fetch(`http://localhost:3000/update/${id}`, {
            method: 'PUT',
            headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
            body: dataToSend
        })
        const data = await res.json()
        console.log(data)

        if (res.ok) {
            navigate("/");
        } else {
            alert("Update failed");
        }
    }

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center h-[89.5vh] bg-gray-100">

                <form onSubmit={updateProduct} encType="multipart/form-data"
                    className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4">
                    <h2 className="text-2xl font-bold text-center">Update Product</h2>
                    {/* Title */}
                    <div>
                        <label className="block mb-1 font-medium">Product Title</label>
                        <input type="text" placeholder="Enter product title" value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    {/* Description */}
                    <div>
                        <label className="block mb-1 font-medium">Product Description</label>
                        <input type="text" placeholder="Enter product description" value={formData.description}
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                    {/* Price */}
                    <div>
                        <label className="block mb-1 font-medium">Product Price</label>
                        <input type="number" placeholder="Enter product price" value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    {/* Image */}
                    <div>
                        <label className="block mb-1 font-medium">Product Image</label>
                        <input type="file" className="w-full border rounded-lg p-2 bg-white"
                            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                        />
                    </div>
                    {/* Button */}
                    <button type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition" >
                        Upload Product
                    </button>
                </form>
            </div>
        </>
    );
}


export default UpdateProduct;