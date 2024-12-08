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
       authToken.setToken(response.accessToken)
       return { success: true, message: response.message};
   } catch (response) {
       return { success: false, message: response.response.data.message ,data:{
        "username": form.username,
        "password": form.password,
    }};
   }
};
// const response = await axios.post("http://localhost:3001/api/chat", data, {
//     headers: { Authorization: `Bearer ${token}` },
// });
export default {
    register,
    login,
}