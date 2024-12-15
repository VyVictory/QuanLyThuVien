import axios from 'axios';
import authToken from '../components/authToken';
//CATEGORY

export async function getAllCategory() {
    const token = authToken.getToken();
    var request = await axios.get(`http://localhost:3001/category/getAllCategory`,
        { headers: { Authorization: `Bearer ${token}` }, }
    )
    return request.data
}
export async function createCategory(categoryData) {
    const token = authToken.getToken();
    const request = await axios.post(`http://localhost:3001/category/createCateogry`, categoryData,
        { headers: { Authorization: `Bearer ${token}` }, }
    )
    return request.data
}
export async function getCategoryById(id) {
    try {
        const token = authToken.getToken();
        var request = await axios.get(`http://localhost:3001/category/getCategoryById/${id}`,
            { headers: { Authorization: `Bearer ${token}` }, }
        )
        return request.data
    } catch (error) {

    }

}
export async function updateCategory(id, categoryData) {
    const token = authToken.getToken();
    const request = await axios.put(`http://localhost:3001/category/updateCategory/${id}`, categoryData,
        { headers: { Authorization: `Bearer ${token}` }, }
    );
    return request.data
}
//BOOK
export async function getAllBook() {
    const token = authToken.getToken();
    var request = await axios.get(`http://localhost:3001/book/getallbooks`,
        { headers: { Authorization: `Bearer ${token}` }, }
    )
    return request.data
}
export async function getBookById(id) {
    const token = authToken.getToken();
    var request = await axios.get(`http://localhost:3001/book/getbook/${id}`,
        { headers: { Authorization: `Bearer ${token}` }, }
    )
    return request.data
}
export async function createBook(bookData) {
    const token = authToken.getToken();
    const request = await axios.post(`http://localhost:3001/book/createBook`, bookData,
        { headers: { Authorization: `Bearer ${token}` }, }
    )
    return request.data
}
//USER
export async function getAllUser() {
    const token = authToken.getToken();
    var request = await axios.get(`http://localhost:3001/auth/getAllUser`,
        { headers: { Authorization: `Bearer ${token}` }, }
    )
    return request.data
}
//Request
export async function getAllRequest() {
    const token = authToken.getToken();
    var request = await axios.get(`http://localhost:3001/book/getAllRequests`,
        { headers: { Authorization: `Bearer ${token}` }, }
    )
    return request.data
}
export async function comfirmRequest(requestId) {
    const token = authToken.getToken();
    const request = await axios.put(`http://localhost:3001/book/approveRequestBorrow/${requestId}`, {},
        { headers: { Authorization: `Bearer ${token}` }, }
    )
    return request
}

export async function rejectRequest(requestId) {
    const token = authToken.getToken();
    var request = await axios.put(`http://localhost:3001/book/rejectRequestBorrow/${requestId}`, {},
        { headers: { Authorization: `Bearer ${token}` }, }
    )
    return request
}

export async function returnRequest(id){
    const token = authToken.getToken();
    var request = await axios.put(`http://localhost:3001/book/borrowRequestBorrow/${id}`, {},
        { headers: { Authorization: `Bearer ${token}` }, }
    )
    return request
}