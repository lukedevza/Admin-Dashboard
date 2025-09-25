"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { editEmployeeSchema } from "@/schemas";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { useState, useTransition } from "react";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { updateEmployee } from "@/actions/update-employee";

//

const roles = [
  { label: "Admin", value: "ADMIN" },
  { label: "Manager", value: "MANAGER" },
  { label: "Employee", value: "EMPLOYEE" },
];

interface createEmployeeFormProps {
  departments: {
    id: string;
    name: string;
  }[];
  user: User;
}

export default function EditEmployeeForm({ departments, user }: createEmployeeFormProps) {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof editEmployeeSchema>>({
    resolver: zodResolver(editEmployeeSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.firstName,
      email: user.email,
      password: user.password,
      role: user.role,
      departmentId: user.departmentId,
    },
  });

  const onSubmit = (values: z.infer<typeof editEmployeeSchema>) => {
    setError("");
    startTransition(() => {
      updateEmployee(user.id, values).then((data) => {
        if (data?.error) {
          form.reset();
          setError(data.error);
        } else {
          router.push("/dashboard");
        }
      });
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="space-y-4 w-full md:max-w-5/6">
          <div className="grid grid-cols-2 w-full gap-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Employee First Name"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Employee Last Name"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder=""
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="*******"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-8 w-full">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          {roles.find((r) => r.value === field.value)?.label || "Select Role"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="bottom">
                        <DropdownMenuLabel>Select Role</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {roles.map((role) => (
                          <DropdownMenuItem
                            key={role.value}
                            onClick={() => field.onChange(role.value)}
                          >
                            {role.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="departmentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          {departments.find((d) => d.id === field.value)?.name || "Select Role"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="bottom">
                        <DropdownMenuLabel>Select Department</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {departments.map((department) => (
                          <DropdownMenuItem
                            key={department.id}
                            onClick={() => field.onChange(department.id)}
                          >
                            {department.name}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? <Loader2 className="animate-spin" /> : "Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
