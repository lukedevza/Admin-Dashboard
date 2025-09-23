"use server";

import { db } from "@/lib/db";

export async function deleteEmployee(id: string) {
  await db.user.delete({
    where: { id },
  });
  return { success: true };
}
