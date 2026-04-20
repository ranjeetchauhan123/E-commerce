const userCollection = require("../schema/userSchema");
const blacklistCollection = require("../schema/blackList");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')


// generate JWT Token
const generateAccessToken = async (user) => {
    const token = await jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, { expiresIn: '10m' });
    return token;
};

const generateRefereshToken = async (user) => {
    const token = await jwt.sign({ id: user._id }, process.env.Referesh_TOKEN, { expiresIn: '24h' });
    return token;
};

// Login API
const handleLogin = async (req, res) => {
    try {
        const { email, password, c_password } = req.body;
        if (!email || !password || !c_password) {
            return res.send({ message: "All fields are required", success: false });
        }
        const userData = await userCollection.findOne({ email });
        if (!userData) {
            return res.send({ message: "User not found", success: false });
        }
        if (password !== c_password) {
            return res.send({ message: "Password does not match", success: false });
        }
        const isMatch = await bcrypt.compare(password, userData.password);
        if (!isMatch) {
            return res.send({ message: "Invalid password", success: false });
        }
        if (userData.isLogin) {
            return res.send({ message: "User already logged in", success: false });
        }
        userData.isLogin = true;
        await userData.save();

        const accessToken = await generateAccessToken(userData);
        const refereshToken = await generateRefereshToken(userData);

        return res.send({
            message: "User login successful", success: true, userData: userData,
            accessToken: accessToken, refereshToken: refereshToken, tokenType: 'Bearer'
        });
    } catch (err) {
        console.log(err);
        return res.send({ message: "Something went wrong", success: false, error: err.message });
    }
};

const handleProfile = async (req, res) => {
    try {
        const id = req.user?.id;
        const profileData = await userCollection.findById(id);
        if (!profileData) {
            return res.send({ message: "Invalid user", success: false });
        }
        return res.send({ message: "User Profile", success: true, profile: profileData });
    } catch (err) {
        return res.send({ message: "Something error", success: false, error: err.message });
    }
};

const handleLogout = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.send({ message: "token not recevied", success: false })
    }
    try {
        const userID = req.user.id
        await userCollection.findByIdAndUpdate(userID, { $set: { isLogin: false } })

        await blacklistCollection.create({ accessToken: token })
        return res.status(200).json({ message: 'Logout Success !!', success: true })

    } catch (err) {
        return res.send({ message: "something error", success: false, error: err.message })
    }
}

// ....................forgate password
const changePassword = async (req, res) => {
    try {
        const { email, newPass, c_newPass } = req.body
        if (!email || !newPass) {
            return res.send({ message: "email & Password is required", success: false })
        }
        if (newPass !== c_newPass) {
            return res.send({ message: "Password not Match", success: false })
        }

        const userID = await userCollection.findOne({ email })
        if (!userID) {
            return res.send({ message: "user not found", success: false })
        }
        const hashPass = await bcrypt.hash(newPass, 10)
        const userData = await userCollection.findByIdAndUpdate(userID._id, { $set: { password: hashPass } })
        return res.send({ message: "Password Change Successfully !! Please Login", success: true })
        if (!userData) {
            return res.send({ message: "Invalid User", success: false })
        }
    } catch (err) {
        console.log(err)
        return res.send({ message: "password Change Error", success: false, error: err.message })
    }
}

const navigateProfile = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: 'Id not Recevied', success: false });
        }
        const profileData = await userCollection.findOne({ _id: id })
        if (!profileData) {
            return res.status(200).json({ message: 'Invalid ID', success: false });
        }
        return res.status(200).json({ message: 'Profile Details', success: true, data: profileData });
    } catch (err) {
        return res.status(500).json({ message: 'Faild to Navigate', success: false });
    }
}


const updateProfile = async (req, res) => {
    try {
        const image = req.file ? req.file.filename : null;
        console.log(image)
        const id = req.params.id;
        const { name, profession } = req.body;
        if (!name || !profession) {
            if (req.file) {
                const filePath = path.join(__dirname, '../public/profile', req.file.filename);
                fs.unlink(filePath, (err) => {
                    if (err) console.log('Image delete error:', err);
                });
            }
            return res.status(400).json({ message: 'All field are required', success: false });
        }
        if (!id) {
            return res.status(400).json({ message: 'Update Id not recevied', success: false });
        }
        const updateData = await userCollection.findByIdAndUpdate(id, { $set: { name, profession, image } }, { new: true })
        return res.status(200).json({ message: 'profile Update Success !!', success: true, data: updateData });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Faild to Update', success: false, error: err.message });
    }
}





module.exports = {
    handleLogin, handleProfile, handleLogout, changePassword,
    navigateProfile, updateProfile
};