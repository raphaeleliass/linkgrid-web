import CreateLinkForm from "@/components/forms/createLinkForm";
import UserCard from "@/components/ui/user-card";
import { useUser } from "@/context/userContext";

export default function DashboardHome() {
  const { user } = useUser();

  return (
    <div className="space-y-4">
      <CreateLinkForm />
      <UserCard userData={user} />
    </div>
  );
}
