import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import * as AuthService from "./authService.js"


export const signUp = async (req, res) => {
    console.log(req.body)
    const { email, password, phone, firstName, lastName, role } = req.body;
    let filter = { email }
    AuthService.signUp(filter).then(async (existingUser) => {
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        // if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match! " });
        const hashedPassword = await bcrypt.hash(password, 12);

        filter = { email, password: hashedPassword, name: `${firstName} ${lastName}`, role, phone }
        AuthService.create(filter).then((result) => {
            const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.status(200).json({ result, token })
        })
            .catch((err) => {
                console.log(err)
                return res.status(500).json({ message: "Something went wrong!" })
            })
    })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ message: "Something went wrong!" })
        })
};



export const signIn = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    let filter = { email }
    AuthService.signIn(filter).then(async (existingUser) => {
        if (!existingUser) {
            console.log('inside')
            return res.status(200).json({ message: "User doesn't exist!" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials." });
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.status(200).json({ result: existingUser, token });
    })
        .catch((err) => {
            console.log(err)
            return res.status(500).json({ message: "Something went wrong!" })
        })
}