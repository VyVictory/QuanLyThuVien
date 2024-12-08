import cookieModule from "./cookie.module";

function getToken() {
    return cookieModule().getCookie("Token")
}
function setToken(value) {
    return cookieModule().setCookie("Token", value, 10)
}
function deleteToken() {
    return cookieModule().deleteCookie("Token")
}
export default { getToken, setToken, deleteToken };