import { Router } from "express";
import { loginValidation } from "../../middlewares/auth/loginValidation";
import login from "../../controllers/auth/loginController";
import { signupValidation } from "../../middlewares/auth/signupValidation";
import signup from "../../controllers/auth/signUpController";
import verifyEmail from "../../controllers/auth/verifyEmailController";
import {
    validateRequestReset,
    validateVerifyOtp,
    validateResetPassword,
} from "../../middlewares/auth/forgotPasswordValidation";
import {
    requestPasswordReset,
    verifyOtp,
    resetPassword,
} from "../../controllers/auth/forgotPasswordController";
import { asyncHandler } from "../../utils/errorHandler";

const router = Router();



router.post("/login", loginValidation, asyncHandler(login));
router.post("/signup", signupValidation, asyncHandler(signup));
router.post("/verify-email", asyncHandler(verifyEmail));

// Forgot password routes with stricter rate limiting
router.post(
    "/forgot-password/request",
    validateRequestReset,
    asyncHandler(requestPasswordReset)
);
router.post(
    "/forgot-password/verify",
    validateVerifyOtp,
    asyncHandler(verifyOtp)
);
router.post(
    "/forgot-password/reset",
    validateResetPassword,
    asyncHandler(resetPassword)
);

export { router as authRoutes };