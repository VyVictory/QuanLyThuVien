//http://localhost:3001/category/getAllCategory
import axios from "axios";
const getAllCategory = async () => {
    try {
        const response = await axios.get("http://localhost:3001/category/getAllCategory");
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error };
    }

};
export default {
    getAllCategory,
}