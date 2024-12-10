//http://localhost:3001/category/getAllCategory
const getAllCategory = async () => {
    let token = authToken.getToken()
    if (authToken.getToken()) {
        try {
            const response = await axios.get("http://localhost:3001/category/getAllCategory", {
                headers: { Authorization: `Bearer ${token}` },
            });
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, token: token };
        }
    } else {
        return { success: false,mess:'not token', token: token };
    }

};
export default {
    getAllCategory,
    
}