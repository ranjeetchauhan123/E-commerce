const productCollection = require("../schema/productSchema")
const cartCollection = require("../schema/mycart")
const path = require('path')
const fs = require('fs')
//get product
const getProduct = async (req, res) => {
    try {
        const products = await productCollection.find()
        return res.status(200).json({ message: 'get Product', success: true, products })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ message: 'get Product faild', success: false })
    }
}

//uploadProduct

const uploadProduct = async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!title || !description || !price || !image) {
            if (req.file) {
                const filePath = path.join(__dirname, '../public/upload', req.file.filename)
                fs.unlink(filePath, (err) => {
                    if (err) {
                        return res.status(400).json({ message: 'file Delete Error', success: false });
                    }
                })
            }
            return res.status(400).json({ message: 'All fields are required', success: false });
        }
        const productData = await productCollection.create({ image, title, description, price });
        return res.status(201).json({
            message: 'Product uploaded successfully',
            success: true, product: productData
        });
    } catch (err) {
        console.error("Upload error:", err);
        return res.status(500).json({ message: 'Server error', success: false });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: 'Id not Recevied', success: false });
        }
        const deleteItem = await productCollection.findByIdAndDelete({ _id: id })
        return res.status(200).json({ message: 'product delete Success', success: true, item: deleteItem });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'faild to delete', success: false });
    }
}

const navigate = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: 'Id not Recevied', success: false });
        }
        const data = await productCollection.findOne({ _id: id })
        return res.status(200).json({ message: 'product Details', success: true, data: data });
    } catch (err) {
        return res.status(500).json({ message: 'Faild to Navigate', success: false });
    }
}


const updateProduct = async (req, res) => {
    try {
        const image = req.file ? req.file.filename : null;
        const id = req.params.id;
        const { title, description, price } = req.body;
        if (!title || !price || !description) {
            if (req.file) {
                const filePath = path.join(__dirname, '../public/upload', req.file.filename);
                fs.unlink(filePath, (err) => {
                    if (err) console.log('Image delete error:', err);
                });
            }
            return res.status(400).json({ message: 'All field are required', success: false });
        }
        if (!id) {
            return res.status(400).json({ message: 'Update Id not recevied', success: false });
        }
        const updateData = await productCollection.findByIdAndUpdate(id, { $set: { title, description, price, image } }, { new: true })
        return res.status(200).json({ message: 'product Details', success: true, data: updateData });
    } catch (err) {
        return res.status(500).json({ message: 'Faild to Update', success: false, error: err.message });
    }
}

const handleCart = async (req, res) => {
    const { title, description, price, image, id } = req.body
    try {
        if (!req.body) {
            return res.status(400).json({ message: 'Body Undefined', success: false });
        }
        const product = await productCollection.findOne({ _id: id })
        if (!product) {
            return res.status(400).json({ message: 'Invalid Product', success: false });
        }
        const myCard = await cartCollection.create({id: id, title, description, price, image })
        // if(myCard._id === id){
        //     return res.status(400).json({ message: 'Product already Added in Cart', success: false });
        // }
        return res.status(200).json({ message: 'product Information', success: true, product: myCard });
    } catch (err) {
        return res.status(500).json({ message: 'something Error', success: false, error: err.message });
    }
}

//getCard
const getMyCard = async (req, res) => {
    try {
        const myCard = await cartCollection.find()
        if(!myCard){
           return res.status(400).json({ message: 'no such Card', success: false}); 
        }
        return res.status(200).json({ message: 'my Cards', success: true, myCard })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ message: 'get Product faild', success: false,error : err.message })
    }
}

const deleteCart = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: 'Id not Recevied', success: false });
        }
        const deleteItem = await cartCollection.findByIdAndDelete({ _id: id })
        return res.status(200).json({ message: 'cart delete Success', success: true , deleteItem});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'faild to delete', success: false });
    }
}

module.exports = { getProduct, uploadProduct, deleteProduct, navigate,
    updateProduct, handleCart, getMyCard , deleteCart}