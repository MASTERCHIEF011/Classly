import mongoose from 'mongoose'

const authSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    joinedOn: { type: Date, default: Date.now() },
    role: { type: String, required: true }
})

const Auth = mongoose.model('Auth', authSchema)

export default Auth