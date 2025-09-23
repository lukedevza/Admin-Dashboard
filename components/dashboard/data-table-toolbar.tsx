"use client";

import { GlobalFiltering, Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/dashboard/data-table-view-options";

import { departments, roles } from "@/data/table";
import { DataTableFacetedFilter } from "@/components/dashboard/data-table-faceted-filter";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  role: string;
}

export function DataTableToolbar<TData>({ table, role }: DataTableToolbarProps<TData>) {
  const searchParams = useSearchParams();
  const departmentParam = searchParams.get("department");
  const isFiltered = table.getState().columnFilters.length > 0;
  useEffect(() => {
    if (departmentParam) {
      table.getColumn("department")?.setFilterValue(departmentParam);
    } else {
      table.getColumn("department")?.setFilterValue(undefined);
    }
  }, [departmentParam, table]);
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="Filter..."
          value={table.getState().globalFilter ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("department") && (
          <DataTableFacetedFilter
            column={table.getColumn("department")}
            title="Department"
            options={departments}
          />
        )}
        {table.getColumn("role") && (
          <DataTableFacetedFilter
            column={table.getColumn("role")}
            title="Role"
            options={roles}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.resetColumnFilters()}
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
        <Button
          size="sm"
          disabled={role !== "ADMIN"}
        >
          <Link href="/dashboard/create">Add New Employee</Link>
        </Button>
      </div>
    </div>
  );
}
