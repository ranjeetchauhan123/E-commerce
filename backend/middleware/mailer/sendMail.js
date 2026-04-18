require('dotenv').config()
const nodemailer = require('nodemailer');
const userCollection = require('../../schema/userSchema');
const bcrypt = require('bcrypt')
const fs = require('fs')
const path = require('path')

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD
    }
})

const sendOtp = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!email) {
            return res.send({ message: 'Email are required Must', success: false });
        }
        let userData = await userCollection.findOne({ email });

        const otp = Math.floor(100000 + Math.random() * 900000);
        const expiresAt = Date.now() + 2 * 60 * 1000;

        const mailOption = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: 'Generate OTP',
            text: `Mr. ${name}, your OTP is ${otp}`
        };

        if (userData) {
            if (userData.isVerify) {
                return res.send({ message: 'Email already exists, please login', success: false });
            }

            userData.otp = otp;
            userData.otpExpire = expiresAt;
            userData.name = name;

            await userData.save();

        } else {
            await userCollection.create({ name, email, otp, otpExpire: expiresAt, isVerify: false });
        }

        await transport.sendMail(mailOption);
        return res.send({ message: 'OTP sent successfully', success: true });
    } catch (err) {
        return res.send({ message: 'Something error', success: false, error: err.message });
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { email, otp, password, profession } = req.body;
        const user = await userCollection.findOne({ email })

        if (!user) {
            if (req.file) {
                const filePath = path.join(__dirname, '../public/profile', req.file.filename)
                fs.unlink(filePath, (err) => {
                    if (err) {
                        return res.send({ message: 'image delete Error', success: false })
                    }
                })
            }
            return res.send({ message: 'Email are must be Require', success: false })
        }

        if (user.otp !== otp) {
            return res.send({ message: 'Invalid OTP', success: false })
        }

        if (user.otpExpire < Date.now()) {
            user.otp = null
            await user.save();
            return res.send({ message: 'Your otp is expier please try again', success: false, showResend: true })
        }

        user.password = await bcrypt.hash(password, 10)
        user.profession = profession;
        user.isVerify = true
        if (req.file) {
            user.image = req.file.filename;
        }
        user.otp = null
        await user.save();

        return res.send({ message: 'OTP verified & Registration complete', success: true })
    } catch (err) {
        return res.send({ message: 'Faild to registerd', success: false, error: err.message })
    }


}

module.exports = { sendOtp, verifyOtp }