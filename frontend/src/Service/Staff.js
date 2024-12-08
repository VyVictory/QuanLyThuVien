import axios from 'axios';

//CATEGORY
export async function getAllCategory() {
    var request = await axios.get(`http://localhost:3001/category/getAllCategory`)
    return request.data
}
export async function createCategory(categoryData) {
    const request = await axios.post(`http://localhost:3001/category/createCateogry`, categoryData)
    return request.data
}
// BOOK
export async function getAllBook() {
    var request = await axios.get(`http://localhost:3001/book/getallbooks`)
    return request.data
}