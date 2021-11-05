import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    subject: {
        type: String,
        default: null
    },
    slotName: [String],
    slotTiming: [Date],
    slotStudents: [[mongoose.Schema.Types.ObjectId]]
})

const Teacher = mongoose.model("Teacher", teacherSchema)

export default Teacher