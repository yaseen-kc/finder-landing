import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import prisma from "../../lib/prisma";
import { AppError } from "../../utils/errorHandler";
import { sendVerificationOtpEmail } from "../../utils/email";

export default async function signup(req: Request, res: Response) {
	const { name, email, password } = req.body as { name: string; email: string; password: string };

	const existing = await prisma.user.findUnique({ where: { email } });
	if (existing) {
		throw new AppError("Email already in use", 409);
	}

    const passwordHash = await bcrypt.hash(password, 10);
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

	const user = await prisma.user.create({
		data: {
			email,
			name,
			password: passwordHash,
            verificationToken: otp,
            verificationTokenExpiresAt: expiresAt,
		},
	});

    await sendVerificationOtpEmail(email, otp);

	return res.status(201).json({ success: true, message: "Signup successful. Please verify your email.", userId: user.id });
}


