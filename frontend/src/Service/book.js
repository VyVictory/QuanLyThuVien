import axios from 'axios';
//localhost:3001/book/getbookbyCategory/6753c0af12fcaa2ff2003a23
const getAllBook = async () => {
    try {
        const response = await axios.get("http://localhost:3001/book/getallbooks");
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false,error: error};
    }
};
const getAllBookByCategory = async (idCategory) => {
    try {
        const response = await axios.get("http://localhost:3001/book/getbookbyCategory/"+{idCategory});
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false,error: error};
    }
};
export default {
    getAllBook,
    getAllBookByCategory,
}