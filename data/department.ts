import { db } from "@/lib/db";

export const getDepartments = async () => {
  try {
    return await db.department.findMany({
      include: {
        _count: {
          select: { users: true },
        },
      },
    });
  } catch {
    return null;
  }
};
