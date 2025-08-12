import { z } from "zod";

export const addressSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required"),
  mobileNumber: z
    .string()
    .trim()
    .min(1, "Mobile number is required")
    .regex(/^\d{10}$/, "Enter a valid 10-digit mobile number"),
  pincode: z
    .string()
    .trim()
    .min(1, "Pincode is required")
    .regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
  locality: z.string().trim().min(1, "Locality is required"),
  addressLine: z.string().trim().min(1, "Address is required"),
  cityDistrictTown: z.string().trim().min(1, "City/District/Town is required"),
  stateTerritoryRegion: z
    .string()
    .trim()
    .min(1, "State/Territory/Region is required"),
  landmark: z.string().optional(),
});

export type AddressForm = z.infer<typeof addressSchema>;


