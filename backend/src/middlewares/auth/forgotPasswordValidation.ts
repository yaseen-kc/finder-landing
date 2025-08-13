import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../../utils/errorHandler";

export const validateRequestReset = (req: Request, res: Response, next: NextFunction) => {
	const { email } = req.body || {};
	const errors: Array<{ field: string; message: string }> = [];

	if (!email || typeof email !== "string") {
		errors.push({ field: "email", message: "Email is required" });
	}

	if (errors.length > 0) {
		throw new ValidationError(errors);
	}

	return next();
};

export const validateVerifyOtp = (req: Request, res: Response, next: NextFunction) => {
	const { email, otp } = req.body || {};
	const errors: Array<{ field: string; message: string }> = [];

	if (!email || typeof email !== "string") {
		errors.push({ field: "email", message: "Email is required" });
	}

	if (!otp || typeof otp !== "string" || otp.trim().length !== 6) {
		errors.push({ field: "otp", message: "OTP must be a 6-digit code" });
	}

	if (errors.length > 0) {
		throw new ValidationError(errors);
	}

	return next();
};

export const validateResetPassword = (req: Request, res: Response, next: NextFunction) => {
	const { email, otp, newPassword } = req.body || {};
	const errors: Array<{ field: string; message: string }> = [];

	if (!email || typeof email !== "string") {
		errors.push({ field: "email", message: "Email is required" });
	}

	if (!otp || typeof otp !== "string" || otp.trim().length !== 6) {
		errors.push({ field: "otp", message: "OTP must be a 6-digit code" });
	}

	if (!newPassword || typeof newPassword !== "string" || newPassword.length < 6) {
		errors.push({ field: "newPassword", message: "Password must be at least 6 characters" });
	}

	if (errors.length > 0) {
		throw new ValidationError(errors);
	}

	return next();
};


