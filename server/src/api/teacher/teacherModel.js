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
    className: {
        morning: {
            type: String,
            default: ''
        },
        afternoon: {
            type: String,
            default: ''
        },
        evening: {
            type: String,
            default: ''
        }
    },
    slot: {
        morning: [{
            type: mongoose.Schema.Types.ObjectId,
            default: null
        }],
        afternoon: [{
            type: mongoose.Schema.Types.ObjectId,
            default: null
        }],
        evening: [{
            type: mongoose.Schema.Types.ObjectId,
            default: null
        }]
    },
    meetingName: [String],
    conversationIdData: [{
        slotName: {
            type: String,
            default: ""
        },
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