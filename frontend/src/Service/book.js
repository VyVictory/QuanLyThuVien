import axios from 'axios';
//localhost:3001/book/getbookbyCategory/6753c0af12fcaa2ff2003a23
import authToken from '../components/authToken';
const getAllBook = async () => {
    try {
        const response = await axios.get("http://localhost:3001/book/getallbooks");
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error };
    }
};
const getAllBookByCategory = async (idCategory) => {
    try {
        const response = await axios.get("http://localhost:3001/book/getbookbyCategory/" + idCategory);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error };
    }
};
const getBookById = async (idBook) => {
    try {
        const response = await axios.get("http://localhost:3001/book/getbook/" + idBook);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error };
    }
};
const requestBorrow = async (idBook) => {
    let token = authToken.getToken()
    if (authToken.getToken()) {
        try {
            const response = await axios.post(`http://localhost:3001/book/requestBorrow/${idBook}`, {},{
                headers: { Authorization: `Bearer ${token}` },
            });
            return { success: true, user: response.data };
        } catch (error) {
            return { success: false, mess:error.response.data.message };
        }
    } else {
        return { success: false,mess:'not token', token: token };
    }
};

export default {
    getAllBook,
    getAllBookByCategory,
    getBookById,
    requestBorrow,
}