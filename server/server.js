import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();


app.use(express.urlencoded({ limit: "30mb", extended: "true" }));
app.use(express.json({ limit: "30mb", extended: "true" }));

app.use(cors());

const PORT = process.env.PORT || 5000
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));


app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

