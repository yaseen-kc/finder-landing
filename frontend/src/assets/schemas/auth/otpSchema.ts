import { z } from "zod";
import { OTP_VALIDATION } from "../../constants/authentication/otpVerificationConstant";

export const otpSchema = z
  .string()
  .min(1, OTP_VALIDATION.CODE_REQUIRED)
  .regex(/^\d{4}$/, OTP_VALIDATION.CODE_INVALID);


