import User from "./authModel.js"

export const signUp = (filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existingUser = await User.findOne(filter);
            resolve(existingUser);
        } catch (error) {
            reject(error);
        }
    });
};

export const signIn = (filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existingUser = await User.findOne(filter);
            resolve(existingUser);
        } catch (error) {
            reject(error);
        }
    });
};

export const create = (filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newUser = await User.create(filter);
            resolve(newUser);
        } catch (error) {
            reject(error);
        }
    });
};