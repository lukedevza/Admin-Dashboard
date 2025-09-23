import { CircleDollarSign, Shield, User, Users, Warehouse } from "lucide-react";

export const departments = [
  { value: "Warehouse", label: "Warehouse", icon: Warehouse },
  { value: "Sales", label: "Sales", icon: CircleDollarSign },
];

export const roles = [
  { label: "Admin", value: "ADMIN", icon: Shield },
  { label: "Manager", value: "MANAGER", icon: User },
  { label: "Employee", value: "EMPLOYEE", icon: Users },
];
