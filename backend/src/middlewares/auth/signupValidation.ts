import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../../utils/errorHandler";

export const signupValidation = (req: Request, res: Response, next: NextFunction) => {
	const { name, email, password } = req.body || {};
	const errors: Array<{ field: string; message: string }> = [];

	if (!name || typeof name !== "string" || name.trim().length < 2) {
		errors.push({ field: "name", message: "Name must be at least 2 characters" });
	}

	if (!email || typeof email !== "string") {
		errors.push({ field: "email", message: "Email is required" });
	} else {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			errors.push({ field: "email", message: "Email is invalid" });
		}
	}

	if (!password || typeof password !== "string" || password.length < 6) {
		errors.push({ field: "password", message: "Password must be at least 6 characters" });
	}

	if (errors.length > 0) {
		throw new ValidationError(errors);
	}

	return next();
};


