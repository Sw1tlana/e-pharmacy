import * as Yup from "yup";
import { formatRegex, passwordRegex } from "../helpers/constants";

export const signInSchema = Yup.object().shape({
    email: Yup.string()
        .matches(
            formatRegex,
            "Invalid email format"
        )
        .required("Required"),
    password: Yup.string()
        .matches(
            passwordRegex,
            "Password must be at least 6 characters long, include one uppercase letter, one number, and one special character"
        )
});