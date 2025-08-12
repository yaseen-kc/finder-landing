import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { LOGIN_COPY } from "../../constants/authentication/loginConstant";
import { loginSchema } from "../../schemas/auth/loginSchema";

type FormState = {
  email: string;
  password: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

function validate(state: FormState): FormErrors {
  const result = loginSchema.safeParse(state);
  if (result.success) return {};
  const errors: FormErrors = {};
  for (const issue of result.error.issues) {
    const path = issue.path[0] as keyof FormState | undefined;
    if (path && !errors[path]) errors[path] = issue.message;
  }
  return errors;
}

export default function LoginView() {
  const [form, setForm] = useState<FormState>({ email: "", password: "" });
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({
    email: false,
    password: false,
  });
  const [submitting, setSubmitting] = useState(false);

  const errors = useMemo(() => validate(form), [form]);
  const isValid = Object.keys(errors).length === 0;

  function handleBlur(field: keyof FormState) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function handleChange(
    field: keyof FormState,
    value: string
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!isValid) return;
    try {
      setSubmitting(true);
      // TODO: integrate with auth API
      await new Promise((r) => setTimeout(r, 700));
      // On success, navigate as needed
    } finally {
      setSubmitting(false);
    }
  }

  const emailInvalid = touched.email && !!errors.email;
  const passwordInvalid = touched.password && !!errors.password;

  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* Image section (hidden on mobile) */}
      <div className="relative hidden lg:block">
        <img
          src={LOGIN_COPY.imageSrc}
          alt={LOGIN_COPY.imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
      </div>

      {/* Form section */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
              {LOGIN_COPY.pageTitle}
            </h1>
            <p className="mt-1 text-sm text-zinc-600">
              {LOGIN_COPY.pageSubtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-700"
              >
                {LOGIN_COPY.emailLabel}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={LOGIN_COPY.emailPlaceholder}
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                aria-invalid={emailInvalid}
                aria-describedby={emailInvalid ? "email-error" : undefined}
                className={`mt-1 block w-full rounded-lg border px-3 py-2.5 placeholder:text-zinc-400 focus:outline-none focus:ring-2 transition-shadow ${
                  emailInvalid
                    ? "border-error-500 focus:ring-error-500"
                    : "border-zinc-300 focus:ring-primary-600 focus:border-primary-600"
                }`}
              />
              {emailInvalid && (
                <p id="email-error" className="mt-2 text-sm text-error-600">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mt-5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-700"
              >
                {LOGIN_COPY.passwordLabel}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder={LOGIN_COPY.passwordPlaceholder}
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                onBlur={() => handleBlur("password")}
                aria-invalid={passwordInvalid}
                aria-describedby={
                  passwordInvalid ? "password-error" : undefined
                }
                className={`mt-1 block w-full rounded-lg border px-3 py-2.5 placeholder:text-zinc-400 focus:outline-none focus:ring-2 transition-shadow ${
                  passwordInvalid
                    ? "border-error-500 focus:ring-error-500"
                    : "border-zinc-300 focus:ring-primary-600 focus:border-primary-600"
                }`}
              />
              {passwordInvalid && (
                <p id="password-error" className="mt-2 text-sm text-error-600">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={!isValid || submitting}
                className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary-600 px-4 font-medium text-white shadow-sm transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? "Signing in…" : LOGIN_COPY.loginButton}
              </button>
            </div>

            <div className="mt-6 flex items-center justify-between text-sm">
              <Link
                to={LOGIN_COPY.contactLinkHref}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                {LOGIN_COPY.contactLinkText}
              </Link>

              <div className="text-zinc-600">
                {LOGIN_COPY.signupPrompt}{" "}
                <Link
                  to={LOGIN_COPY.signupLinkHref}
                  className="font-medium text-primary-600 hover:text-primary-700"
                >
                  {LOGIN_COPY.signupLinkText}
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

