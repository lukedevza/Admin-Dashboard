"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { Employee } from "@/schemas";
import { DataTableColumnHeader } from "@/components/dashboard/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const getColumns = (currentUserRole: string): ColumnDef<Employee>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="ID"
      />
    ),
    cell: ({ row }) => <div className="w-[50px] truncate">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="First Name"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="max-w-[100px] truncate font-medium">{row.getValue("firstName")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Last Name"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center gap-2">
          <span className="max-w-[400px] truncate font-medium">{row.getValue("lastName")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Email"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[200px] items-center gap-2">
          <span className="max-w-[500px] truncate font-medium">{row.getValue("email")}</span>
        </div>
      );
    },
    filterFn: (row, id, value: string) => {
      const rowValue = row.getValue(id) as string;
      return rowValue.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: "department",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Department"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center gap-2">
          <span className="max-w-[400px] truncate font-medium">{row.getValue("department")}</span>
        </div>
      );
    },
    filterFn: (row, id, value: string[]) => {
      if (!value || value.length === 0) return true; // no filter
      const rowValue = row.getValue(id) as string;
      return value.includes(rowValue);
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Role"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center gap-2">
          <span className="max-w-[400px] truncate font-medium">{row.getValue("role")}</span>
        </div>
      );
    },
    filterFn: (row, id, value: string[]) => {
      if (!value || value.length === 0) return true;
      const rowValue = row.getValue(id) as string;
      return value.includes(rowValue);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        employeeId={row.getValue("id")}
        role={currentUserRole}
      />
    ),
  },
];
