import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';


import authRoutes from './src/auth/authRoutes.js';
import teacherRoutes from './src/api/teacher/teacherRoutes.js'

dotenv.config();
const app = express();


app.use(express.urlencoded({ limit: "30mb", extended: "true" }));
app.use(express.json({ limit: "30mb", extended: "true" }));
// app.use(express.static(path.join(__dirname + "/public")));
app.use(cors());

const PORT = process.env.PORT || 5000
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));


app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use("/user", authRoutes);
app.use("/teacher", teacherRoutes);


