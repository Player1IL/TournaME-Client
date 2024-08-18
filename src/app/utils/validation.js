export function validatePasswords(password, passwordRepeat) {
    return password === passwordRepeat;
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
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
