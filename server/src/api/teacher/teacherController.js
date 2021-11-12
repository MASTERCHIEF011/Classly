import request from 'request';
import multer from 'multer'
import fs from 'fs'

import * as TeacherService from './teacherService.js'
import * as StudentService from '../student/studentService.js'

const startAnalysis = async (authToken, path, meetingName, callback) => {

    let data = {}
    const check = async (jobId, conversationId) => {
        let options = {
            url: `https://api.symbl.ai/v1/job/${jobId}`,
            headers: { 'Authorization': `Bearer ${authToken}` },
            json: true
        }
        TeacherService.getJobStatus(options).then(async (body) => {
            console.log(body);
            if (body.status === 'in_progress' || body.status === 'scheduled') {
                check(jobId, conversationId)
            }
            if (body.status === 'completed') {

                let [messages, questions, analytics, actionItems, entities, followUps, topics, summary] =
                    [TeacherService.getSpeechToText(conversationId, authToken),
                    TeacherService.getQuestions(conversationId, authToken),
                    TeacherService.getAnalytics(conversationId, authToken),
                    TeacherService.getActionItems(conversationId, authToken),
                    TeacherService.getEntities(conversationId, authToken),
                    TeacherService.getFollowUps(conversationId, authToken),
                    TeacherService.getTopics(conversationId, authToken),
                    TeacherService.getSummary(conversationId, authToken)
                    ]
                await Promise.allSettled([messages, questions, analytics, actionItems, entities, followUps, topics, summary])
                    .then(async result => {
                        let i
                        const properties = ['messages', 'questions', 'analytics', 'actionItems', 'entities', 'followUps', 'topics', 'summary']
                        for (i = 0; i < 8; i++) {
                            data[properties[i]] = result[i].value
                        }
                        console.log(data)
                        let ans = {
                            'emotion': [],
                            'sarcasm': [],
                            'intent': [],
                            'profaneWord': [],
                        }
                        for (i = 0; i < data.messages.messages.length; i++) {
                            let emotion = await TeacherService.getEmotionAnalysis(data.messages.messages[i].text)
                            let sarcasm = await TeacherService.getSarcasmAnalysis(data.messages.messages[i].text)
                            let intent = await TeacherService.getIntentAnalysis(data.messages.messages[i].text)
                            let profaneWord = await TeacherService.getAbuseAnalysis(data.messages.messages[i].text)
                            ans['emotion'].push(emotion)
                            ans['sarcasm'].push(sarcasm)
                            ans['intent'].push(intent)
                            ans['profaneWord'].push(profaneWord)
                        }
                        data['extraAnalysis'] = ans
                        callback(null, data)
                    })
                fs.unlink(path, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })

            }
        })
            .catch((err) => {
                console.log(err)
                res.status(500).json({ message: "Something went wrong!" })
            })

    }


    console.log(path)
    const videoFileStream = fs.createReadStream(path);

    const params = {
        'name': meetingName,
        // <Optional, string| your_conversation_name | Your meeting name. Default name set to conversationId.>

        'confidenceThreshold': 0.5,
        // <Optional, double| confidence_threshold | Minimum required confidence for the insight to be recognized.>

        // 'webhookUrl': "https://yourdomain.com/jobs/callback",
        // <Optional, string| your_webhook_url| Webhook url on which job updates to be sent. (This should be post API)>",

        'customVocabulary': ['Assignment', 'Company', 'Code', 'Edward', 'John'],
        // <Optional, list| custom_vocabulary_list> |Contains a list of words and phrases that provide hints to the speech recognition task.

        'detectPhrases': true,
        // <Optional, boolean| detect_phrases> |Accepted values are true & false. It shows Actionable Phrases in each sentence of conversation. These sentences can be found in the Conversation's Messages API.

        'languageCode': "en-US",
        // <Optional, boolean| language_code> |code of language of recording.
        'enableSeparateRecognitionPerChannel': true,
        'enableSpeakerDiarization': true,
        'diarizationSpeakerCount': 2,
        'enableSummary': true,
        // "channelMetadata": [
        //     {
        //         "channel": 1,
        //         "speaker": {
        //             "name": "Robert Bartheon",
        //             "email": "robertbartheon@example.com"
        //         }
        //     },
        //     {
        //         "channel": 2,
        //         "speaker": {
        //             "name": "Arya Stark",
        //             "email": "aryastark@example.com"
        //         }
        //     }
        // ]
    }

    const videoOption = {
        url: 'https://api.symbl.ai/v1/process/video',
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'video/mp4'
        },
        qs: params,
        json: true,
    };

    const responses = {
        400: 'Bad Request! Please refer docs for correct input fields.',
        401: 'Unauthorized. Please generate a new access token.',
        404: 'The conversation and/or it\'s metadata you asked could not be found, please check the input provided',
        429: 'Maximum number of concurrent jobs reached. Please wait for some requests to complete.',
        500: 'Something went wrong! Please contact support@symbl.ai'
    }

    videoFileStream.pipe(request.post(videoOption, (err, response, body) => {
        const statusCode = response.statusCode;
        if (err || Object.keys(responses).indexOf(statusCode.toString()) !== -1) {
            throw new Error(responses[statusCode]);
        }
        console.log('Status code: ', statusCode);
        console.log('Body', body.conversationId);
        console.log('JobId', body.jobId);


        check(body.jobId, body.conversationId)

    }));
}


export const sendVideoData = async (req, res) => {
    try {
        // console.log(__dirname)
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'public')
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname)
            }
        })
        var upload = multer({ storage: storage }).single('file')
        console.log(upload, "checkfor empty file")
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err)
            } else if (err) {
                return res.status(500).json(err)
            }
            console.log("ss")
            let path = `public/${req.body.fileName}`
            let url = ''
            var options = {
                method: 'post',
                url: "https://api.symbl.ai/oauth2/token:generate",
                body: {
                    type: "application",
                    appId: process.env.APP_ID,
                    appSecret: process.env.APP_SECRET
                },
                json: true
            }
            TeacherService.generateAuthToken(options).then((authToken) => {
                console.log("jjjjjjjjjjjjjj", authToken)


                startAnalysis(authToken.accessToken, path, req.body.meetingName, async (err, data) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        try {
                            const messageData = data.messages.messages
                            let i;
                            for (i = 0; i < messageData.length; i++) {
                                let tempEmotion = data.extraAnalysis.emotion[i].emotion
                                let tempIntent = data.extraAnalysis.intent[i].intent
                                let tempProfane = data.extraAnalysis.profaneWord[i]
                                let tempSarcasm = data.extraAnalysis.sarcasm[i]
                                messageData[i].emotion = Object.keys(tempEmotion).reduce((a, b) => tempEmotion[a] > tempEmotion[b] ? a : b)
                                messageData[i].intent = Object.keys(tempIntent).reduce((a, b) => tempIntent[a] > tempIntent[b] ? a : b)
                                messageData[i].profane = Object.keys(tempProfane).reduce((a, b) => tempProfane[a] > tempProfane[b] ? a : b)
                                messageData[i].sarcasm = Object.keys(tempSarcasm).reduce((a, b) => tempSarcasm[a] > tempSarcasm[b] ? a : b)
                            }
                            //Creating the Final data
                            console.log(data, "**********************")
                            await TeacherService.update({ teacherId: req.userId }, { $push: { conversationIdData: { conversationId: data.messages.messages[0].conversationId, createdAt: Date.now(), slotName: req.body.slotName, meetingName: req.body.meetingName, analysisData: data, url: url } } })
                                .then(() => {
                                    res.status(200).json(data)
                                })
                                .catch((err) => {
                                    console.log(err)
                                    return res.status(500).json({ message: "Something went wrong!" })
                                })
                        }
                        catch (error) {
                            console.log(error.message)
                            res.status(500).json({ message: error })
                        }

                    }
                })

            })
                .catch((err) => {
                    console.log(err)
                    return res.status(500).json({ message: "Something went wrong!" })
                })

        })

    } catch (error) {
        console.log(error)
    }
}

export const pendingStudentList = (req, res) => {
    var filter = {
        teacherId: req.userId
    }
    TeacherService.find(filter).then(async (teacherData) => {
        filter = {
            subject: teacherData.subject
        }
        await StudentService.find(filter).then((pendingStudentList) => {
            res.status(200).json(pendingStudentList)
        })
            .catch((err) => {
                console.log(err)
                return res.status(500).json({ message: "Something went wrong!" })
            })
    })
        .catch((err) => {
            console.log(err)
            return res.status(500).json({ message: "Something went wrong!" })
        })

}

export const getRegisteredStudentList = async (req, res) => {
    var filter = {
        teacherId: req.userId,
    }
    TeacherService.find(filter).then(async (response) => {
        if (response == null) {
            res.status(204).json({ message: "No student found!" })
        }
        else {
            console.log(response)
            res.status(200).json(response)
        }
    })
        .catch((err) => {
            console.log(err)
            return res.status(500).json({ message: "Something went wrong!" })
        })
}


export const addStudent = async (req, res) => {

    TeacherService.update({ teacherId: req.userId }, { $push: { slot: { [req.body.preferredSlot]: { $each: req.body.studentList } } } }).then(async () => {
        console.log("Succefully added Students!")
        StudentService.update({ studentId: { $in: req.body.studentList } }, { $push: { teachersAlloted: { teacher: req.userId, slotName: req.query.slotName } } })
        res.status(200).json({ message: "Succefully added Students!" })
    })
        .catch((err) => {
            console.log(err)
            return res.status(500).json({ message: "Something went wrong!" })
        })
}


export const createClass = async (req, res) => {
    var filter = { teacherId: req.userId }
    TeacherService.find(filter).then((teacher) => {
        if (teacher.length > 0) {
            console.log(teacher, "muskurane")
            TeacherService.update({ teacherId: req.userId }, { $push: { className: { [req.body.slotName]: req.body.className }, subject: req.body.subject, slot: { [req.body.slotName]: { $each: [] } } } }).then(async (teacher) => {
                console.log("Succefully updated Class!", teacher)
                res.status(200).json({ message: "Succefully updated Class!" })
            })
                .catch((err) => {
                    console.log(err)
                    return res.status(500).json({ message: "Something went wrong!" })
                })
        }
        else {
            TeacherService.insert({ teacherId: req.userId, className: { [req.body.slotName]: req.body.className }, subject: req.body.subject, slot: { [req.body.slotName]: [] } }).then(async (teacher) => {
                console.log("Succefully created Class!", teacher)
                res.status(200).json({ message: "Succefully created Class!" })
            })
                .catch((err) => {
                    console.log(err)
                    return res.status(500).json({ message: "Something went wrong!" })
                })
        }
    })
        .catch((err) => {
            console.log(err)
            return res.status(500).json({ message: "Something went wrong!" })
        })
}

export const viewClasses = async (req, res) => {
    var filter = { teacherId: req.userId }

    TeacherService.find(filter).then(async (classes) => {

        console.log("Succefully added Students!")
        res.status(200).json(classes)
    })
        .catch((err) => {
            console.log(err)
            return res.status(500).json({ message: "Something went wrong!" })
        })
}