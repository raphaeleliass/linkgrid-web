import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

export const metadata = {
  title: "LinkGrid - Dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <SidebarProvider defaultOpen >
      <AppSidebar />
      <main>
        <SidebarTrigger />
        oi
        {children}
      </main>
    </SidebarProvider>
  );
}
