import Student from "./studentModel.js";

export const find = (filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await Student.find(filter)
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

export const update = (filter, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await Student.updateMany(filter, data)
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};


