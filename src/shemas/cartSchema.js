import * as Yup from "yup";
import { formatRegex, isValidLatinInput } from "../helpers/constants";

export const cartSchema = Yup.object().shape({
    name: Yup.string()
        .matches(isValidLatinInput, "A comment can only contain Latin characters")
        .required("Required"),
    email: Yup.string()
        .matches(
            formatRegex,
            "Invalid email format"
        )
        .required("Required"),
    phone: Yup.string()
        .matches(
            /^\+?[1-9]\d{1,14}$/,
            "Invalid phone number"
        )
        .required("Required"),
    address: Yup.string()
        .min(5, "Address must be at least 5 characters long") 
        .required("Required"),
});