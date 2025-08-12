import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { OTP_ARIA, OTP_COPY, OTP_VALIDATION } from "../../constants/authentication/otpVerificationConstant";
import { otpSchema } from "../../schemas/auth/otpSchema";

type OtpState = [string, string, string, string];

function isCompleteCode(code: OtpState) {
  return otpSchema.safeParse(code.join("")).success;
}

export default function OtpVerification() {
  const [digits, setDigits] = useState<OtpState>(["", "", "", ""]);
  const [touched, setTouched] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState(false);
  const [resendIn, setResendIn] = useState(30);

  const inputsRef = useRef<Array<HTMLInputElement | null>>([null, null, null, null]);

  const code = digits.join("");
  const hasError = useMemo(() => {
    if (!touched) return false;
    return !otpSchema.safeParse(code).success;
  }, [code, touched]);

  useEffect(() => {
    const id = setInterval(() => {
      setResendIn((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  function handleChange(index: number, value: string) {
    const next = value.replace(/\D/g, "");
    setDigits((prev) => {
      const updated = [...prev] as OtpState;
      updated[index] = next.slice(-1) ?? "";
      return updated as OtpState;
    });

    if (next) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      if (digits[index]) {
        setDigits((prev) => {
          const updated = [...prev] as OtpState;
          updated[index] = "";
          return updated as OtpState;
        });
        return;
      }
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft") {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight") {
      inputsRef.current[index + 1]?.focus();
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched(true);
    if (!isCompleteCode(digits)) return;
    try {
      setSubmitting(true);
      // TODO: connect to verify OTP API
      await new Promise((r) => setTimeout(r, 800));
      // On success, route accordingly
    } finally {
      setSubmitting(false);
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const txt = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (!txt) return;
    e.preventDefault();
    const next: OtpState = ["", "", "", ""];
    for (let i = 0; i < txt.length; i++) next[i] = txt[i] ?? "";
    setDigits(next);
    inputsRef.current[Math.min(txt.length, 3)]?.focus();
  }

  const errorMessage = (() => {
    const res = otpSchema.safeParse(code);
    if (res.success) return undefined;
    return res.error.issues[0]?.message ?? OTP_VALIDATION.CODE_INVALID;
  })();

  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-white" aria-label={OTP_ARIA.REGION_LABEL}>
      {/* Illustration */}
      <div className="relative hidden lg:block">
        <img
          src={OTP_COPY.imageSrc}
          alt={OTP_COPY.imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
      </div>

      {/* Form */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">{OTP_COPY.pageTitle}</h1>
            <p className="mt-1 text-sm text-zinc-600">{OTP_COPY.pageSubtitle}</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <label className="block text-sm font-medium text-zinc-700">
              {OTP_COPY.otpLabel}
            </label>
            <div className="mt-2 flex items-center gap-3" role="group" aria-label={OTP_COPY.otpLabel}>
              {digits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputsRef.current[idx] = el;
                  }}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  onPaste={handlePaste}
                  onBlur={() => setTouched(true)}
                  aria-label={OTP_ARIA.OTP_INPUT(idx)}
                  aria-invalid={hasError}
                  className={`h-12 w-12 text-center text-lg tracking-[0.2em] rounded-lg border focus:outline-none focus:ring-2 transition-shadow ${
                    hasError
                      ? "border-error-500 focus:ring-error-500"
                      : "border-zinc-300 focus:ring-primary-600 focus:border-primary-600"
                  }`}
                />
              ))}
            </div>
            {hasError && (
              <p className="mt-2 text-sm text-error-600">{errorMessage}</p>
            )}

            <div className="mt-6">
              <button
                type="submit"
                disabled={!isCompleteCode(digits) || submitting}
                className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary-600 px-4 font-medium text-white shadow-sm transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? "Verifying…" : OTP_COPY.verifyButton}
              </button>
            </div>

            <div className="mt-6 flex items-center justify-between text-sm">
              <Link to={OTP_COPY.changeEmailHref} className="text-primary-600 hover:text-primary-700 font-medium">
                {OTP_COPY.changeEmailText}
              </Link>
              <button
                type="button"
                disabled={resendIn > 0}
                onClick={() => setResendIn(30)}
                aria-label={resendIn > 0 ? OTP_ARIA.RESEND_DISABLED(resendIn) : OTP_COPY.resendCta}
                className="text-primary-600 hover:text-primary-700 font-medium disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {OTP_COPY.resendPrefix} {" "}
                <span className="underline">
                  {resendIn > 0 ? `${OTP_COPY.resendCta} (${resendIn})` : OTP_COPY.resendCta}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

