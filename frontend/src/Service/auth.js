import axios from 'axios';
import formatDate from './formatDate';
const register = async (form) => {
    // {
    //     "numberPhone": "01836887911",
    //     "firstName":"uchiha",
    //     "lastName":"Nemo",
    //     "address":"242 đường nemo, châu đốc-AnGiang",
    //     "gender": "true",
    //     "birthday":"16/06/2003",
    //     "password":"0836887911tien"
    // }
    //{"password":"$2a$10$L3M2iUmWjS3BZMLwkdoYIeq8e4vh4R8VCeXN8eHH8Ufva89AEaxYS","firstName":"uchiha","lastName":"Nemo","address":"242 đường nemo, châu đốc-AnGiang","gender":"true","birthday":"16/06/2003","role":1,"isActive":true,"_id":"675517ab76fd0bbccab77f7a","createdAt":"2024-12-08T03:51:07.964Z","updatedAt":"2024-12-08T03:51:07.964Z","__v":0}
    try {
        const response = await axios.post("http://localhost:3001/auth/register", {
            "numberPhone": form.numberPhone,
            "firstName": form.firstName,
            "lastName": form.lastName,
            "address": form.address,
            "gender": form.gender,
            "birthday": formatDate(form.birthday),
            "password": form.password
        });
        if (response) {
            return {response:response, success: true};
        } else {
            console.error("Failed to register:", response);
            return { success: false, message: "Failed to register",data:form };
        }
    } catch (error) {
        return ({ success: false,data:{
            "numberPhone": form.numberPhone,
            "firstName": form.firstName,
            "lastName": form.lastName,
            "address": form.address,
            "gender": form.gender,
            "birthday": formatDate(form.birthday),
            "password": form.password
        }})
    }
};

// const response = await axios.post("http://localhost:3001/api/chat", data, {
//     headers: { Authorization: `Bearer ${token}` },
// });
export default {
    register,
}