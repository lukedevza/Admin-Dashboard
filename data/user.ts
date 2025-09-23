import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export const getEmployees = async () => {
  const users = await db.user.findMany({
    include: {
      department: true, // <- include the department relation
    },
  });

  // map to the shape your table expects
  return users.map((u) => ({
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    email: u.email,
    role: u.role,
    department: u.department.name, // now it's the string
  }));
};

export const deleteEmployee = async (id: string) => {
  try {
    const deletedUser = await db.user.delete({
      where: { id },
    });
    return deletedUser;
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw new Error("Failed to delete employee");
  }
};
