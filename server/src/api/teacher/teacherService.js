import request from "request";
import Teacher from "./teacherModel.js";



export const find = (filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await Teacher.find(filter)
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

export const insert = (filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await Teacher.insert(filter)
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};



export const getJobStatus = (options) => {
    return new Promise(async (resolve, reject) => {
        try {
            request(options, (error, response) => {
                if (error) throw new Error(error);
                console.log(response.body);
            });;
            resolve(response.body);
        } catch (error) {
            reject(error);
        }
    });
};









export const getEmotionAnalysis = (text) => {
    console.log("getEmotionalAnalysis")
    return new Promise((resolve, reject) => {
        request.post({
            url: `https://apis.paralleldots.com/v5/emotion`,
            form: {
                api_key: process.env.API_KEY,
                text: text
            },
            json: true
        }, (err, response, body) => {
            if (err) {
                reject(err)
            }
            else {
                console.log("insideGetEmotions", body);
                resolve(body)
            }

            // res.status(200).json({ message: body.messages })
        });
    })

}




export const getSarcasmAnalysis = (text) => {
    console.log("getSarcasmAnalysis")
    return new Promise((resolve, reject) => {
        request.post({
            url: `https://apis.paralleldots.com/v4/sarcasm`,
            form: {
                api_key: process.env.API_KEY,
                text: text
            },
            json: true
        }, (err, response, body) => {
            if (err) {
                reject(err)
            }
            else {
                console.log("insideGetSarcasm", body);
                resolve(body)
            }
            // res.status(200).json({ message: body.messages })
        });
    })

}

export const getIntentAnalysis = (text) => {
    console.log("getIntentAnalysis")
    return new Promise((resolve, reject) => {
        request.post({
            url: `https://apis.paralleldots.com/v4/new/intent`,
            form: {
                api_key: process.env.API_KEY,
                text: text
            },
            json: true
        }, (err, response, body) => {
            if (err) {
                reject(err)
            }
            else {
                console.log("insideGetIntent", body);
                resolve(body)
            }
            // res.status(200).json({ message: body.messages })
        });
    })

}


export const getAbuseAnalysis = (text) => {
    console.log("getAbuseAnalysis")
    return new Promise((resolve, reject) => {
        request.post({
            url: `https://apis.paralleldots.com/v4/abuse`,
            form: {
                api_key: process.env.API_KEY,
                text: text
            },
            json: true
        }, (err, response, body) => {
            if (err) {
                reject(err)
            }
            else {
                console.log("insideGetAbuse", body);
                resolve(body)
            }
            // res.status(200).json({ message: body.messages })
        });
    })

}


// ***********Symbl API***********

export const generateAuthToken = (callback) => {
    console.log("authtoken")
    const authOptions = {
        method: 'post',
        url: "https://api.symbl.ai/oauth2/token:generate",
        body: {
            type: "application",
            appId: process.env.APP_ID,
            appSecret: process.env.APP_SECRET
        },
        json: true
    };

    request(authOptions, (err, body) => {
        if (err) {
            console.error('error posting json: ', err);
            throw err
        }
        callback(body.body)
    })
};

// *****************Conversation API requests*******************

export const getSpeechToText = (conversationId, authToken) => {
    console.log("getSpeechtoText")
    return new Promise((resolve, reject) => {
        request.get({
            url: `https://api.symbl.ai/v1/conversations/${conversationId}/messages?sentiment=true`,
            headers: { 'Authorization': `Bearer ${authToken}` },
            json: true
        }, (err, response, body) => {
            if (err) {
                reject(err)
            }
            else {
                console.log("insideGetConversation", body);
                resolve(body)
            }
        });
    })

}

export const getActionItems = (conversationId, authToken) => {
    return new Promise((resolve, reject) => {
        request.get({
            url: `https://api.symbl.ai/v1/conversations/${conversationId}/action-items`,
            headers: { 'Authorization': `Bearer ${authToken}` },
            json: true
        }, (err, response, body) => {
            if (err) {
                reject(err)
            }
            else {
                console.log("insideGetActionItems", body);
                resolve(body)
            }
        });
    })

}

export const getFollowUps = (conversationId, authToken) => {
    console.log("followUps")
    return new Promise((resolve, reject) => {
        request.get({
            url: `https://api.symbl.ai/v1/conversations/${conversationId}/follow-ups`,
            headers: { 'Authorization': `Bearer ${authToken}` },
            json: true
        }, (err, response, body) => {
            if (err) {
                reject(err)
            }
            else {
                console.log("insideGetFollowUps", body);
                resolve(body)
            }
        });
    })

}

export const getTopics = (conversationId, authToken) => {
    console.log("topics")
    return new Promise((resolve, reject) => {
        request.get({
            url: `https://api.symbl.ai/v1/conversations/${conversationId}/topics?sentiment=true`,
            headers: { 'Authorization': `Bearer ${authToken}` },
            json: true
        }, (err, response, body) => {
            if (err) {
                reject(err)
            }
            else {
                console.log("insideGetTopics", body);
                resolve(body)
            }
        });
    })

}

export const getQuestions = (conversationId, authToken) => {
    console.log("ques")
    return new Promise((resolve, reject) => {
        request.get({
            url: `https://api.symbl.ai/v1/conversations/${conversationId}/questions`,
            headers: { 'Authorization': `Bearer ${authToken}` },
            json: true
        }, (err, response, body) => {
            if (err) {
                reject(err)
            }
            else {
                console.log("insideGetQuestions", body);
                resolve(body)
            }
        });
    })

}



export const getEntities = async (conversationId, authToken) => {
    return new Promise((resolve, reject) => {
        request.get({
            url: `https://api.symbl.ai/v1/conversations/${conversationId}/entities`,
            headers: { 'Authorization': `Bearer ${authToken}` },
            json: true
        }, (err, response, body) => {
            if (err) {
                reject(err)
            }
            else {
                console.log("insideGetQuestions", body);
                resolve(body)
            }

        });
    })
}


export const getAnalytics = (conversationId, authToken) => {
    console.log("analytics")
    return new Promise((resolve, reject) => {
        request.get({
            url: `https://api.symbl.ai/v1/conversations/${conversationId}/analytics`,
            headers: { 'Authorization': `Bearer ${authToken}` },
            json: true
        }, (err, response, body) => {
            if (err) {
                reject(err)
            }
            else {
                console.log("insideGetQuestions", body);
                resolve(body)
            }

        });
    })

}

export const getConversationData = (conversationId, authToken) => {
    console.log("getconversationData")
    return new Promise((resolve, reject) => {
        request.get({
            url: `https://api.symbl.ai/v1/conversations/${conversationId}`,
            headers: { 'Authorization': `Bearer ${authToken}` },
            json: true
        }, (err, response, body) => {
            if (err) {
                reject(err)
            }
            else {
                console.log("insideGetQuestions", body);
                resolve(body)
            }

        });
    })

}

export const deleteConversation = (conversationId, authToken) => {
    console.log("deleteConversationData")
    return new Promise((resolve, reject) => {
        request.delete({
            url: `https://api.symbl.ai/v1/conversations/${conversationId}`,
            headers: { 'Authorization': `Bearer ${authToken}` },
            json: true
        }, (err, response, body) => {
            if (err) {
                reject(err)
            }
            else {
                console.log("insideGetQuestions", body);
                resolve(body)
            }

        });
    })

}

export const getMemberInformation = (conversationId, authToken) => {
    console.log("getMemberInfo")
    return new Promise((resolve, reject) => {
        request.get({
            url: `https://api.symbl.ai/v1/conversations/${conversationId}/members`,
            headers: { 'Authorization': `Bearer ${authToken}` },
            json: true
        }, (err, response, body) => {
            if (err) {
                reject(err)
            }
            else {
                console.log("insideGetQuestions", body);
                resolve(body)
            }

        });
    })

}

export const getSummary = (conversationId, authToken) => {
    return new Promise((resolve, reject) => {
        request.get({
            url: `https://api-labs.symbl.ai/v1/conversations/${conversationId}/summary`,
            headers: { 'Authorization': `Bearer ${authToken}` },
            json: true
        }, (err, response, body) => {
            if (err) {
                reject(err)
            }
            else {
                console.log("insideGetQuestions", body);
                resolve(body)
            }

        });
    })

}