import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";

function UploadProduct() {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        image: null
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("price", formData.price);
        data.append("image", formData.image);

        const res = await fetch("http://localhost:3000/upload", {
            method: "POST",
            headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
            body: data
        });

        const result = await res.json();
        console.log(result);

        if (res.ok) {
            navigate("/");
        } else {
            alert("Upload failed");
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center h-[89.5vh] bg-gray-100">

                <form onSubmit={handleSubmit} encType="multipart/form-data"
                    className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4">
                    <h2 className="text-2xl font-bold text-center">Upload Product</h2>
                    {/* Title */}
                    <div>
                        <label className="block mb-1 font-medium">Product Title</label>
                        <input type="text" placeholder="Enter product title"
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    {/* Description */}
                    <div>
                        <label className="block mb-1 font-medium">Product Description</label>
                        <input type="text" placeholder="Enter product description"
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                    </div>
                    {/* Price */}
                    <div>
                        <label className="block mb-1 font-medium">Product Price</label>
                        <input type="number" placeholder="Enter product price"
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    {/* Image */}
                    <div>
                        <label className="block mb-1 font-medium">Product Image</label>
                        <input type="file" className="w-full border rounded-lg p-2 bg-white"
                            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} />
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


export default UploadProduct;