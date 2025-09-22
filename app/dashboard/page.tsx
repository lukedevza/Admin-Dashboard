import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <p>
      <Button onClick={logout}>Logout</Button>
    </p>
  );
}
