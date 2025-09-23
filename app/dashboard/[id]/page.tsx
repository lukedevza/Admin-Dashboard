interface EmployeeDetailProps {
  params: Promise<{ id: string }>;
}

export default async function EmployeeDetails({ params }: EmployeeDetailProps) {
  const { id } = await params;
  return <div>EMPLOYEE DETAIL {id}</div>;
}
