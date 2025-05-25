"use client";
import { useDashboardMenu } from "@/context/dashboard-menu-context";
import Links from "@/components/layouts/dashboard/links";
import { useUser } from "@/context/userContext";
import DashboardHome from "@/components/layouts/dashboard/DashboardHome";

export default function Dashboard() {
  const { selected } = useDashboardMenu();

  return (
    <main className="w-full py-12">
      {selected === "Início" && <DashboardHome />}
      {selected === "Links" && <Links />}
    </main>
  );
}
