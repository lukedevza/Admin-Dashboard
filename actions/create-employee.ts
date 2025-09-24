"use server";
import { db } from "@/lib/db";
import { createEmployeeSchema } from "@/schemas";
import { Prisma, UserRole } from "@prisma/client";
import * as z from "zod";
import { generateEmail } from "./generate-email";

export async function createEmployee(values: z.infer<typeof createEmployeeSchema>) {
  const validatedFields = createEmployeeSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Credentails" };
  }

  const { firstName, lastName, password, role, departmentId } = validatedFields.data;
  const email = await generateEmail(firstName, lastName);

  try {
    await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        role: role as UserRole,
        departmentId,
      },
    });
  } catch (error: unknown) {
    console.error("Error creating employee:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { error: "Email already exists" };
      }

      if (error.code === "P2003") {
        return { error: "Invalid department selected" };
      }

      return { error: error.message };
    }

    return {
      error: error instanceof Error ? error.message : "Something went wrong. Please try again.",
    };
  }
}
