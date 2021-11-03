import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import * as AuthService from "./authService"


export const signUp = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    let filter = { email }
    AuthService.signUp(filter).then((existingUser) => {
        if (existingUser) {
            res.status(400).json({ message: "User already exists!" });
        }

        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match! " });
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await Auth.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
        const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        mongoose.connection.close()
        res.status(200).json({ result, token })
    })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ message: "Something went wrong!" })
        })
};



export const signIn = async (req, res) => {
    const { email, password } = req.body;
    let filter = { email }
    AuthService.signUp(filter).then((existingUser) => {
        if (!existingUser) {
            res.status(404).json({ message: "User doesn't exist!" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials." });
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ result: existingUser, token });
    })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ message: "Something went wrong!" })
        })
}