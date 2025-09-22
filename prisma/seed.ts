import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create departments
  const sales = await prisma.department.upsert({
    where: { name: "Sales" },
    update: {},
    create: { name: "Sales" },
  });

  const warehouse = await prisma.department.upsert({
    where: { name: "Warehouse" },
    update: {},
    create: { name: "Warehouse" },
  });

  // Hash passwords
  const hashedAdmin = await bcrypt.hash("adminpass", 10);
  const hashedManager = await bcrypt.hash("managerpass", 10);
  const hashedEmployee1 = await bcrypt.hash("employee1pass", 10);
  const hashedEmployee2 = await bcrypt.hash("employee2pass", 10);

  // Create admin
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      firstName: "Admin",
      lastName: "User",
      email: "admin@example.com",
      password: hashedAdmin,
      role: UserRole.ADMIN,
      departmentId: sales.id,
    },
  });

  // Create manager
  await prisma.user.upsert({
    where: { email: "manager@example.com" },
    update: {},
    create: {
      firstName: "Jane",
      lastName: "Manager",
      email: "manager@example.com",
      password: hashedManager,
      role: UserRole.MANAGER,
      departmentId: warehouse.id,
    },
  });

  // Create employees
  await prisma.user.upsert({
    where: { email: "employee1@example.com" },
    update: {},
    create: {
      firstName: "John",
      lastName: "Doe",
      email: "employee1@example.com",
      password: hashedEmployee1,
      role: UserRole.USER,
      departmentId: sales.id,
    },
  });

  await prisma.user.upsert({
    where: { email: "employee2@example.com" },
    update: {},
    create: {
      firstName: "Mary",
      lastName: "Smith",
      email: "employee2@example.com",
      password: hashedEmployee2,
      role: UserRole.USER,
      departmentId: warehouse.id,
    },
  });

  console.log("Database seeded with admin, manager, and employees in Sales and Warehouse!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
