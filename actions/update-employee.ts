"use server";

import { db } from "@/lib/db";
import { editEmployeeSchema } from "@/schemas";
import { UserRole } from "@prisma/client";
import * as z from "zod";
import { Prisma } from "@prisma/client";

export async function updateEmployee(id: string, values: z.infer<typeof editEmployeeSchema>) {
  const validatedFields = editEmployeeSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid credentials" };
  }
  const { firstName, lastName, password, role, departmentId, email } = validatedFields.data;

  try {
    await db.user.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
        password,
        email,
        role: role as UserRole,
        departmentId,
      },
    });
  } catch (error: unknown) {
    console.error("Error updating employee:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { error: "Email already exists" };
      }

      if (error.code === "P2003") {
        return { error: "Invalid department selected" };
      }

      return { error: error.message };
    }

    return { error: error instanceof Error ? error.message : "Something went wrong" };
  }
}
