import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { RegisterSchema } from "@/lib/validation/auth";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input data
        const validatedData = RegisterSchema.parse(body);

        // Check if user with this employee ID already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                userEmpID: validatedData.userEmpID.toUpperCase(),
            },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "A user with this Employee ID already exists" },
                { status: 400 }
            );
        }

        // Hash the password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(validatedData.password, saltRounds);

        // Create the user
        const newUser = await prisma.user.create({
            data: {
                userName: validatedData.userName,
                userEmpID: validatedData.userEmpID.toUpperCase(),
                password: hashedPassword,
                avatar: validatedData.avatar,
            },
            select: {
                id: true,
                userName: true,
                userEmpID: true,
                avatar: true,
                // Don't return the password
            },
        });

        return NextResponse.json(
            {
                message: "User created successfully",
                user: newUser,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration error:", error);

        // Handle Zod validation errors
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    error: "Validation failed",
                    details: error.message,
                },
                { status: 400 }
            );
        }

        // Handle Prisma errors
        if (error instanceof Error && error.message.includes("Unique constraint")) {
            return NextResponse.json(
                { error: "A user with this Employee ID already exists" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}