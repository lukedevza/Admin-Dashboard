import { db } from "@/lib/db";

export const getDepartments = async () => {
  try {
    const departments = await db.department.findMany({
      select: { id: true, name: true },
    });
    return departments;
  } catch {
    return null;
  }
};
