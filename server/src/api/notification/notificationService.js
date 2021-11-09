import request from 'request';

export const addUserToSMTP = (options) => {
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

export const sendEmail = (options) => {
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


