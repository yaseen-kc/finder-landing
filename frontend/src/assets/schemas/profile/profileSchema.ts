import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email"),
  mobile: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || /^\d{10}$/.test(v), {
      message: "Enter a valid 10-digit mobile number",
    }),
  gender: z.enum(["Male", "Female", "Other"]).optional(),
  dob: z
    .string()
    .optional()
    .refine((v) => !v || /^\d{4}-\d{2}-\d{2}$/.test(v), {
      message: "Use YYYY-MM-DD format",
    }),
});

export type ProfileForm = z.infer<typeof profileSchema>;


