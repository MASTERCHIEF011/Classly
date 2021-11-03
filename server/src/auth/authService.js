import Auth from "./authModel.js"

export const signUp = (filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existingUser = await Auth.findOne(filter);
            resolve({ data: existingUser });
        } catch (error) {
            reject(error);
        }
    });
};

export const signIn = (filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existingUser = await Auth.findOne(filter);
            resolve({ data: existingUser });
        } catch (error) {
            reject(error);
        }
    });
};