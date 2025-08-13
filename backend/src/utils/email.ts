import nodemailer from "nodemailer";
import prisma from "../lib/prisma";

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Track verification attempts in memory (you might want to use Redis in production)
const verificationAttempts = new Map<string, { count: number; lastAttempt: Date }>();

export const canSendVerificationEmail = async (email: string) => {
    // Check if email exists in our tracking
    const attempt = verificationAttempts.get(email);

    if (attempt) {
        const now = new Date();
        const timeSinceLastAttempt = now.getTime() - attempt.lastAttempt.getTime();
        const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

        // If more than 3 attempts in the last hour, block
        if (attempt.count >= 3 && timeSinceLastAttempt < oneHour) {
            return false;
        }

        // If last attempt was more than an hour ago, reset count
        if (timeSinceLastAttempt >= oneHour) {
            verificationAttempts.set(email, { count: 1, lastAttempt: now });
            return true;
        }
    }

    return true;
};

export const trackVerificationAttempt = (email: string) => {
    const now = new Date();
    const attempt = verificationAttempts.get(email) || { count: 0, lastAttempt: now };

    verificationAttempts.set(email, {
        count: attempt.count + 1,
        lastAttempt: now
    });
};

export const sendVerificationEmail = async (email: string, token: string) => {
    try {
        // Check rate limits before sending
        if (!await canSendVerificationEmail(email)) {
            throw new Error('Too many verification attempts. Please try again later.');
        }

        const verificationUrl = `${process.env.BASE_URL}/api/auth/verify-email?token=${token}`;

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "Email Verification",
            html: `<p>Verify your email: <a href="${verificationUrl}">Click here</a></p>
             <p>This verification link will expire in 24 hours.</p>`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.messageId);

        // Track successful verification email
        trackVerificationAttempt(email);

        // Store verification attempt in database
        await prisma.verificationAttempt.create({
            data: {
                email,
                type: 'EMAIL_VERIFICATION',
                createdAt: new Date(),
            }
        });

        return true;
    } catch (error) {
        console.error("Email sending failed:", error);
        throw new Error("Failed to send verification email");
    }
};

export const sendVerificationOtpEmail = async (email: string, otp: string) => {
    try {
        // Check rate limits before sending
        if (!await canSendVerificationEmail(email)) {
            throw new Error('Too many verification attempts. Please try again later.');
        }

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "Email Verification OTP",
            html: `
          <p>Your email verification OTP is: <strong>${otp}</strong></p>
          <p>This OTP is valid for 10 minutes.</p>
        `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Verification OTP email sent:", info.messageId);

        // Track successful verification email
        trackVerificationAttempt(email);

        // Store verification attempt in database
        await prisma.verificationAttempt.create({
            data: {
                email,
                type: 'EMAIL_VERIFICATION',
                createdAt: new Date(),
            }
        });

        return true;
    } catch (error) {
        console.error("Verification OTP email sending failed:", error);
        throw new Error("Failed to send verification OTP email");
    }
};

export const sendOtpEmail = async (email: string, otp: string) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "Password Reset OTP",
            html: `
          <p>Your password reset OTP is: <strong>${otp}</strong></p>
          <p>This OTP is valid for 10 minutes.</p>
        `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("OTP email sent:", info.messageId);
        return true;
    } catch (error) {
        console.error("OTP email sending failed:", error);
        throw new Error("Failed to send OTP email");
    }
};