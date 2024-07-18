import {hash} from "bcrypt";

export async function validatePasswords(password, passwordRepeat) {
    if (password === passwordRepeat) {
        return await hash(password, 10)
    }
    return false
}
export function validateDob(dob) {
    const dobF = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - dobF.getFullYear();
    const monthDiff = today.getMonth() - dobF.getMonth();
    const dayDiff = today.getDate() - dobF.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }
    return age >= 13;
}
export function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}
