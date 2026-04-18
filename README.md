# 🛒 E-Commerce Mini Project (MERN Stack)

A full-stack **E-Commerce Mini Application** built using the **MERN stack (MongoDB, Express, React, Node.js)** with complete **Authentication & Authorization system**.

This project demonstrates real-world backend and frontend integration including secure login, JWT authentication, protected routes, and basic e-commerce functionality.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* User Registration & Login
* Password hashing using **bcrypt**
* JWT based authentication (Access Token + Refresh Token)
* Protected Routes using Middleware
* Token Verification system
* Logout with Token Blacklisting
* Single device login restriction (isLogin flag)

---

### 🛍️ E-Commerce Functionalities

* Product Listing
* Search functionality
* Add to Cart (frontend/backend integration)
* User Profile
* Secure API handling

---

### 📂 Backend Features

* REST API using **Express.js**
* MongoDB database with **Mongoose**
* File upload using **Multer**
* Email sending using **Nodemailer**
* Environment variables using **dotenv**
* CORS enabled

---

### 🎨 Frontend Features

* Built with **React 19**
* Routing using **React Router DOM**
* Modern UI with **Tailwind CSS**
* Icons using **React Icons**
* Responsive design

---

## 🧰 Tech Stack

### Backend:

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (jsonwebtoken)
* bcrypt
* Multer
* Nodemailer

### Frontend:

* React
* React Router DOM
* Tailwind CSS
* Vite

## 🔐 Authentication Flow

1. User registers → send otp → data stored in MongoDB
2. Login → password verified using bcrypt
3. JWT token generated
4. Token stored on frontend (localStorage)
5. Protected routes accessed using middleware
6. Logout → token added to blacklist


## 🧠 Learning Highlights

* JWT Authentication (Access + Refresh Token)
* Middleware based Authorization
* Password hashing security
* Token Blacklisting concept
* Full MERN integration
* REST API design

