"use client";

import { useState } from "react";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { DeleteEmployeeDialog } from "./delete-employee-dialog";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  employeeId: string;
  role: string;
}

export function DataTableRowActions<TData>({
  row,
  employeeId,
  role,
}: DataTableRowActionsProps<TData>) {
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="data-[state=open]:bg-muted size-8"
            disabled={role !== "ADMIN"}
          >
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-[160px]"
        >
          <DropdownMenuItem
            asChild
            disabled={role !== "ADMIN"}
          >
            <Link href={`/dashboard/${employeeId}`}>Edit</Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              setDeleteOpen(true);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteEmployeeDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        employeeId={employeeId}
      />
    </>
  );
}
