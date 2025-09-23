import { auth } from "@/auth";
import Table from "@/components/dashboard/table-view";
import { getEmployees } from "@/data/user";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  const employees = await getEmployees();

  return (
    <>
      <Table
        data={employees}
        role={session?.user.role}
      />
    </>
  );
}
