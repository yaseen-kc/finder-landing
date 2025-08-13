import { Request, Response } from "express";
import crypto from "crypto";
import prisma from "../../lib/prisma";
import { AppError } from "../../utils/errorHandler";
import { sendOtpEmail } from "../../utils/email";

const generateOtp = () => crypto.randomInt(100000, 999999).toString();

export const requestPasswordReset = async (req: Request, res: Response) => {
	const { email } = req.body as { email: string };
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) {
		// Do not reveal email existence
		return res.status(200).json({ success: true, message: "If the email exists, an OTP has been sent" });
	}

	const otp = generateOtp();
	const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

	await prisma.user.update({
		where: { id: user.id },
		data: {
			resetPasswordOtp: otp,
			resetPasswordOtpExpiresAt: expiresAt,
		},
	});

	await sendOtpEmail(email, otp);

	return res.status(200).json({ success: true, message: "OTP sent to email" });
};

export const verifyOtp = async (req: Request, res: Response) => {
	const { email, otp } = req.body as { email: string; otp: string };
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user || !user.resetPasswordOtp || user.resetPasswordOtp !== otp) {
		throw new AppError("Invalid OTP", 400);
	}

	if (!user.resetPasswordOtpExpiresAt || user.resetPasswordOtpExpiresAt < new Date()) {
		throw new AppError("OTP has expired", 400);
	}

	return res.status(200).json({ success: true, message: "OTP verified" });
};

export const resetPassword = async (req: Request, res: Response) => {
	const { email, otp, newPassword } = req.body as { email: string; otp: string; newPassword: string };
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user || !user.resetPasswordOtp || user.resetPasswordOtp !== otp) {
		throw new AppError("Invalid OTP", 400);
	}

	if (!user.resetPasswordOtpExpiresAt || user.resetPasswordOtpExpiresAt < new Date()) {
		throw new AppError("OTP has expired", 400);
	}

	// Hash the new password
	const bcrypt = await import("bcryptjs");
	const passwordHash = await bcrypt.hash(newPassword, 10);

	await prisma.user.update({
		where: { id: user.id },
		data: {
			password: passwordHash,
			resetPasswordOtp: null,
			resetPasswordOtpExpiresAt: null,
		},
	});

	return res.status(200).json({ success: true, message: "Password reset successful" });
};


