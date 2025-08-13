import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../../lib/prisma";
import { AuthenticationError, NotFoundError } from "../../utils/errorHandler";

export default async function login(req: Request, res: Response) {
	const { email, password } = req.body as { email: string; password: string };

	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) {
		throw new NotFoundError("User");
	}

	if (!user.emailVerified) {
		throw new AuthenticationError("Please verify your email before logging in");
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new AuthenticationError("Invalid email or password");
	}

	const { password: _removed, verificationToken, verificationTokenExpiresAt, resetPasswordOtp, resetPasswordOtpExpiresAt, ...safeUser } = user as any;

	return res.status(200).json({ success: true, user: safeUser });
}


