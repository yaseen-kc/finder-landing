import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../../utils/errorHandler";

export const loginValidation = (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body || {};
	const errors: Array<{ field: string; message: string }> = [];

	if (!email || typeof email !== "string") {
		errors.push({ field: "email", message: "Email is required" });
	} else {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			errors.push({ field: "email", message: "Email is invalid" });
		}
	}

	if (!password || typeof password !== "string") {
		errors.push({ field: "password", message: "Password is required" });
	}

	if (errors.length > 0) {
		throw new ValidationError(errors);
	}

	return next();
};


