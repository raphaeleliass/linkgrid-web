"use client";
import React from "react";
import { useDashboardMenu } from "@/context/dashboard-menu-context";
import Links from "@/components/layouts/dashboard/links";
import { useUser } from "@/context/userContext";

export default function Dashboard() {
  const { selected } = useDashboardMenu();
  const { user } = useUser();
  return (
    <main className="w-full py-12">
      {selected === "Início" && <div>Olá, {user?.name}</div>}
      {selected === "Links" && <Links />}
    </main>
  );
}
