import { z } from "zod";
export const registerSchema = z.object({
  fullName: z
    .string({ message: "FullName is required" })
    .min(2, "Full name must be at least 2 characters"),
  email: z
    .string({ message: "email is required" })
    .email("Invalid email address"),
  password: z
    .string({ message: "password is required" })
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  phoneNumber: z
    .string({ message: "Phone number is required" })
    .min(10, "Invalid phone number"),
  address: z
    .string({ message: "Address is required" })
    .min(5, "Address must be at least 5 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
