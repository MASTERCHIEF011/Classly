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
    slotStudents: [[mongoose.Schema.Types.ObjectId]],
    meetingName: [String],
    conversationIdData: [{
        conversationId: {
            type: String,
            default: ''
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
        meetingName: {
            type: String,
            default: ""
        },
        analysisData:
        {
            type: Object,
            default: null
        },
        url: {
            type: String,
            default: ''
        }
    }],
})

const Teacher = mongoose.model("Teacher", teacherSchema)

export default Teacher