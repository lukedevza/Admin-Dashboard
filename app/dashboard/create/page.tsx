import CreateEmployeeForm from "@/components/dashboard/create-employee-form";
import { getDepartments } from "@/data/department";

export default async function CreateEmployeePage() {
  const departments = await getDepartments();
  return (
    <div className=" h-full flex-1 flex-col gap-8 px-8 py-4 md:flex">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight">Create New Employee</h2>
        </div>
      </div>
      <CreateEmployeeForm departments={departments ?? []} />
    </div>
  );
}
