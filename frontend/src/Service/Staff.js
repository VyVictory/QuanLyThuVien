import axios from 'axios';

export async function getAllCategory() {
    var request = await axios.get(`http://localhost:3001/category/getAllCategory`)
    return request.data
}
export async function getAllBook() {
    var request = await axios.get(`http://localhost:3001/book/getallbooks`)
    return request.data
}