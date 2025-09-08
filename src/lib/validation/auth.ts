// lib/validations/auth.ts
import { z } from "zod";

// Base schema for user registration (used by API)
export const RegisterSchema = z.object({
    userName: z.string()
        .min(1, "Full name is required")
        .max(25, "Name is too long")
        .trim(),
    userEmpID: z.string()
        .length(5, "Employee ID must be exactly 5 characters")
        .regex(/^[0-9]+$/, "Employee ID must contain only numbers")
        .transform(val => val.toUpperCase()),
    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .max(100, "Password is too long"),
    confirmPassword: z.string().min(6, "Please confirm your password."),
    avatar: z.string()
        .min(1, "Avatar is required")
        .max(255, "Avatar URL is too long"),
});

// Base schema for user login
export const LoginSchema = z.object({
    userEmpID: z.string()
        .length(1, "Required"),
    password: z.string()
        .min(1, "Required")
});