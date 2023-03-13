import * as yup from "yup";
import { ErrorMessages } from "../../common/constants/messages.constant";
import { RegisterVariables } from "../../providers/user/types";

export const validationSchema = yup
  .object<RegisterVariables>({
    name: yup.string().required(ErrorMessages.MANDATORY_FIELD),
    email: yup
      .string()
      .email(ErrorMessages.EMAIL_FORMAT_FIELD)
      .required(ErrorMessages.MANDATORY_FIELD),
    password: yup.string().required(ErrorMessages.MANDATORY_FIELD),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords don't match!")
      .required(ErrorMessages.MANDATORY_FIELD),
  })
  .required();
