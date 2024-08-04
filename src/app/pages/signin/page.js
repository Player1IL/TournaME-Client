// import styles from "./page.module.css";
import Form from "./form"
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";

export default function SignIn() {
    /*
    const session = await getServerSession()
    if (session) {
        redirect("/")
    }
     */
    return (
        <Form/>
    );
};
