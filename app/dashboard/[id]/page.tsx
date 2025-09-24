import EditEmployeeForm from "@/components/dashboard/edit-employee-form";
import { getDepartments } from "@/data/department";
import { getUserById } from "@/data/user";

interface EmployeeDetailProps {
  params: Promise<{ id: string }>;
}

export default async function EmployeeDetails({ params }: EmployeeDetailProps) {
  const { id } = await params;
  const user = await getUserById(id);
  const departments = await getDepartments();

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className=" h-full flex-1 flex-col gap-8 px-8 py-4 md:flex">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight">Edit Employee</h2>
        </div>
      </div>
      <EditEmployeeForm
        departments={departments ?? []}
        user={user}
      />
    </div>
  );
}
