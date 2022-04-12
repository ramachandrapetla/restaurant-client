const data = JSON.parse(localStorage.getItem("userData"));

export function getUserData() {
    return data;
}

export function isUserLoggedIn() {
    if(data) return true;
    else return false
}

export function logoutUser() {
    localStorage.removeItem("userData");
}