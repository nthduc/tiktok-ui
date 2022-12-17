import axios from 'axios';
let token = localStorage.getItem('TOKEN');
if (token) {
    token = token?.slice(1, token.length - 1);
}
const httpRequest = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        type: 'formData',
    },
});
//Thông thường dùng axios res.data.data => custom res.data
export const get = async (path: string, option = {}) => {
    try {
        const response = await httpRequest.get(path, option);
        return response.data;
    } catch (err: unknown) {
        throw new Error('Failed get data request' + err);
    }
};

// POST
export const post = async (path: string, option = {}) => {
    try {
        const response = await httpRequest.post(path, option);
        return response.data;
    } catch (err: unknown) {
        throw new Error('Failed post data request' + err);
    }
};

//PATCH
export const patch = async (path: string, option = {}) => {
    try {
        const response = await httpRequest.patch(path, option);
        return response.data;
    } catch (err: unknown) {
        throw new Error('Failed patch data request' + err);
    }
}

//DELETE
export const DELETE = async (path: string, option = {}) => {
    try {
        const response = await httpRequest.delete(path, option);
        return response.data;
    } catch (err: unknown) {
        throw new Error('Failed delete data request' + err);
    }
}

export default httpRequest;

// Local / development
// Test / Staging
// UAT
// Production
