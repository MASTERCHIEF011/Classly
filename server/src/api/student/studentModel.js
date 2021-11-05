import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    teachersAlloted: [{
        type: mongoose.Schema.Types.ObjectId,
        default: null
    }],
    slot: {
        type: String,
        default: null
    }
})

const Student = mongoose.model("Student", studentSchema)

export default Student