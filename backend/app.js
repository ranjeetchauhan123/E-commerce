require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors');
const connectDB = require('./model/db');
const path = require('path')
const controller = require('./controller/userController');
const { upload } = require('./middleware/multer/multer');
const email = require('./middleware/mailer/sendMail');
const profile = require('./controller/profileController');
const authMiddleware = require('./middleware/auth/auth');
const port = process.env.PORT || 4000;


app.use(cors())
connectDB();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/upload', express.static('public/upload'))
app.use('/profile', express.static('public/profile'))

//get
app.get('/', authMiddleware, controller.getProduct)
// post
app.post('/upload', authMiddleware, upload.single('image'), controller.uploadProduct)
//delete
app.delete('/delete/:id', authMiddleware, controller.deleteProduct)
//Navigare
app.get('/navigate/:id', controller.navigate)
//update
app.put('/update/:id', authMiddleware, upload.single('image'), controller.updateProduct)
// add to cart
app.post('/cart', controller.handleCart)
// get my Card
app.get('/myCart', controller.getMyCard)
// delete my Card
app.delete('/myCart/:id',authMiddleware, controller.deleteCart)
// ...............................................................//
// gererate otp & Verify
app.post('/gererate-otp', email.sendOtp)
app.post('/verify-otp', upload.single('profileImage'), email.verifyOtp)

//login
app.post('/login', profile.handleLogin)
//profile
app.get('/profile', authMiddleware, profile.handleProfile)
//logout
app.post('/logout', authMiddleware, profile.handleLogout)
// forget password
app.post('/forgate-password', profile.changePassword)
// Navigate profile
app.get('/navigate-profile/:id', profile.navigateProfile)
//updateProfile
app.put('/update-profile/:id', upload.single('profileImage'), profile.updateProfile)

app.listen(port, () => {
    console.log(`server is running on Port ${port}`)
})