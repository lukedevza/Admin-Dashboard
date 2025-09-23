"use client";
import { DataTable } from "./data-table";
import { getColumns } from "@/components/dashboard/columns";
import { Employee } from "@/schemas";

interface TableProps {
  data: Employee[];
  role: string;
}

export default function Table({ data, role }: TableProps) {
  const columns = getColumns(role);
  return (
    <>
      <div className="hidden h-full flex-1 flex-col gap-8 px-8 py-4 md:flex">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold tracking-tight">Welcome back!</h2>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={data}
          role={role}
        />
      </div>
    </>
  );
}
