import { z } from "zod";
import { LOGIN_VALIDATION } from "../../constants/authentication/loginConstant";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, LOGIN_VALIDATION.EMAIL_REQUIRED)
    .email(LOGIN_VALIDATION.EMAIL_INVALID),
  password: z
    .string()
    .min(1, LOGIN_VALIDATION.PASSWORD_REQUIRED)
    .min(8, LOGIN_VALIDATION.PASSWORD_MIN_LENGTH),
});

export type LoginForm = z.infer<typeof loginSchema>;


