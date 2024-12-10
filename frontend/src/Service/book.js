import axios from 'axios';

const getAllBook = async () => {
    try {
        const response = await axios.get("http://localhost:3001/book/getallbooks");
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false,error: error};
    }
};
export default {
    getAllBook,
}