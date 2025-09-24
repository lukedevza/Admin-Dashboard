import { db } from "@/lib/db";

function cleanName(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

export async function generateEmail(firstName: string, lastName: string, domain = "company.com") {
  const baseEmail = `${cleanName(firstName)}.${cleanName(lastName)}`;
  let email = `${baseEmail}@${domain}`;
  let counter = 1;

  // Check for duplicates
  while (await db.user.findUnique({ where: { email } })) {
    email = `${baseEmail}${counter}@${domain}`;
    counter++;
  }

  return email;
}
