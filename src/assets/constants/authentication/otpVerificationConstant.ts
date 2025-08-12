export const OTP_COPY = {
  pageTitle: "Verify your email",
  pageSubtitle:
    "Enter the 4-digit code we sent to your email to continue.",
  otpLabel: "One-time passcode",
  verifyButton: "Verify",
  resendPrefix: "Didn't get the code?",
  resendCta: "Resend",
  changeEmailText: "Use a different email",
  changeEmailHref: "/account/login",
  imageAlt: "Person entering a verification code on a phone",
  imageSrc:
    "https://images.unsplash.com/photo-1513569771920-c9e1d31714af?q=80&w=1600&auto=format&fit=crop",
} as const;

export type OtpCopy = typeof OTP_COPY;

export const OTP_VALIDATION = {
  CODE_REQUIRED: "Enter the 4-digit code",
  CODE_INVALID: "Enter a valid 4-digit code",
} as const;

export const OTP_ARIA = {
  REGION_LABEL: "Email verification",
  OTP_INPUT: (index: number) => `Digit ${index + 1}`,
  RESEND_DISABLED: (seconds: number) =>
    `Resend available in ${seconds} seconds`,
} as const;


