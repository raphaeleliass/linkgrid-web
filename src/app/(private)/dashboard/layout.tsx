import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { DashboardMenuProvider } from "@/context/dashboard-menu-context";
import { UserProvider } from "@/context/userContext";

export const metadata = {
  title: "LinkGrid - Dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <UserProvider>
      <SidebarProvider defaultOpen>
        <DashboardMenuProvider>
          <AppSidebar />
          <SidebarTrigger />
          {children}
        </DashboardMenuProvider>
      </SidebarProvider>
    </UserProvider>
  );
}
