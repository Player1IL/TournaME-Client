import {NextResponse} from "next/server";
import {validateDob, validateEmail, validatePasswords} from "../../../utils/validation"

export async function POST(request) {
    try {
        const {email, username, password, passwordRepeat, dob} = await request.json();

        // Need to check if username is in db
        // Need to edit Email validation to check if email not in db
        if (validateEmail(email) && await validatePasswords(password, passwordRepeat) && validateDob(dob)) {
            console.log("ALL VALID");
        } else {
            console.log("ERROR");
        }

        console.log({ email, username, password, passwordRepeat, dob });
    } catch (e) {
        console.error(e);
    }
    return NextResponse.json({ message: "success" });
}