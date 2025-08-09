export const LOGIN_COPY = {
  pageTitle: "Welcome back",
  pageSubtitle: "Sign in to your account to continue",
  emailLabel: "Email address",
  emailPlaceholder: "you@example.com",
  passwordLabel: "Password",
  passwordPlaceholder: "••••••••",
  loginButton: "Log in",
  contactLinkText: "Contact Us",
  contactLinkHref: "/contact",
  signupPrompt: "Don't have an account?",
  signupLinkText: "Sign up",
  signupLinkHref: "/signup",
  imageAlt: "Athlete training in a gym",
  // Prefer local asset if available; fallback to a reliable, generic image
  imageSrc:
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop",
} as const;

export type LoginCopy = typeof LOGIN_COPY;

export const LOGIN_VALIDATION = {
  EMAIL_REQUIRED: "Email is required",
  EMAIL_INVALID: "Enter a valid email",
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_MIN_LENGTH: "Minimum 8 characters",
} as const;