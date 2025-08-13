import { Request, Response } from "express";
import prisma from "../../lib/prisma";
import { AppError } from "../../utils/errorHandler";

export default async function verifyEmail(req: Request, res: Response) {
    const { email, otp } = req.body as { email: string; otp: string };
    if (!email || !otp) {
        throw new AppError("Email and OTP are required", 400);
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.verificationToken || user.verificationToken !== otp) {
        throw new AppError("Invalid OTP", 400);
    }

    if (!user.verificationTokenExpiresAt || user.verificationTokenExpiresAt < new Date()) {
        throw new AppError("OTP has expired", 400);
    }

    await prisma.user.update({
        where: { id: user.id },
        data: {
            emailVerified: true,
            verifiedAt: new Date(),
            verificationToken: null,
            verificationTokenExpiresAt: null,
        },
    });

    return res.status(200).json({ success: true, message: "Email verified successfully" });
}


