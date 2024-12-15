import axios from "axios";
import authToken from "../../components/authToken";
const getList = async () => {
    try {
        const response = await axios.get(`http://localhost:3001/book/getMyHistoryBrrowed`,
            {
                headers: { Authorization: `Bearer ${authToken.getToken()}` },
            }
        );
        return { success: true, data: response.data };
    } catch (response) {
        return { success: false, data: response.response.data.message };
    }          
};
//getMyBrrowedAreBrrowing
const getMyRequests = async () => {
    try {
        const response = await axios.get(`http://localhost:3001/book/getMyRequest`,
            {
                headers: { Authorization: `Bearer ${authToken.getToken()}` },
            }
        );
        return { success: true, data: response.data };
    } catch (response) {
        return { success: false, data: response.response.data.message };
    }          
};
const getMyRequestAccect = async () => {
    try {
        const response = await axios.get(`http://localhost:3001/book/getMyBrrowedAreBrrowing`,
            {
                headers: { Authorization: `Bearer ${authToken.getToken()}` },
            }
        );
        return { success: true, data: response.data };
    } catch (response) {
        return { success: false, data: response.response.data.message };
    }          
};
export default{
    getList,
    getMyRequests,
    getMyRequestAccect,
}