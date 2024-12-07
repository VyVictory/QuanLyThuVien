import axios from 'axios';

const register = async (form) => {
    // {
    //     "numberPhone": "0836887911",
    //     "firstName":"uchiha",
    //     "lastName":"Nemo",
    //     "address":"242 đường nemo, châu đốc-AnGiang",
    //     "gender": "true",
    //     "birthday":"16/06/2003",
    //     "password":"0836887911tien"
    // }
    try {
        const response = await axios.post("http://localhost:3001/auth/register", form);
        if (response.data && response.data.success) {
            return response.data;
        } else {
            console.error("Failed to register:", response.data.message);
            return { success: false, message: "Failed to register" };
        }
    } catch (error) {
        return (error)
    }
};

// const response = await axios.post("http://localhost:3001/api/chat", data, {
//     headers: { Authorization: `Bearer ${token}` },
// });
export default {
    register,
}