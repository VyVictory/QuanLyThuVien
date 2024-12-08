import axios from 'axios';
import formatDate from './formatDate';
import authToken from '../components/authToken';
const register = async (form) => {
    try {
        const response = await axios.post("http://localhost:3001/auth/register", {
            "username": form.username,
            "firstName": form.firstName,
            "lastName": form.lastName,
            "address": form.address,
            "gender": form.gender,
            "birthday": formatDate(form.birthday),
            "password": form.password
        });
        return { success: true, message: response.message };
    } catch (response) {
        return { success: false, message: response.response.data.message };
    }
};
const login = async (form) => {
    try {
        const response = await axios.post("http://localhost:3001/auth/login", {
            "username": form.username,
            "password": form.password,
        });
        authToken.setToken(response.data.accessToken)
        return { success: true, message: response.message };
    } catch (response) {
        return {
            success: false, message: response.response.data.message, data: {
                "username": form.username,
                "password": form.password,
            }
        };
    }
};
const current = async () => {
    let token = authToken.getToken()
    if (authToken.getToken()) {
        try {
            const response = await axios.get("http://localhost:3001/auth/current", {
                headers: { Authorization: `Bearer ${token}` },
            });
            return { success: true, user: response.data };
        } catch (error) {
            return { success: false, token: token };
        }
    } else {
        return { success: false,mess:'not token', token: token };
    }

};
// const response = await axios.post("http://localhost:3001/api/chat", data, {
//     headers: { Authorization: `Bearer ${token}` },
// });
export default {
    register,
    login,
    current,
}