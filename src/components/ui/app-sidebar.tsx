"use client";
import { Home, Link2, Loader2, SidebarClose } from "lucide-react";
import { useDashboardMenu } from "@/context/dashboard-menu-context";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useUser } from "@/context/userContext";

const items = [
  {
    title: "Início",
    icon: Home,
    badge: false,
  },
  {
    title: "Links",
    icon: Link2,
    badge: true,
  },
];

export function AppSidebar() {
  const { setSelected } = useDashboardMenu();
  const { toggleSidebar } = useSidebar();
  const { user, loading } = useUser();

  function currMenuItem(item: string) {
    setSelected(item);

    sessionStorage.setItem("menuItem", item);
  }

  return (
    <Sidebar variant="floating">
      <SidebarContent className="relative">
        <button
          className="absolute top-0 right-0 p-2 md:hidden"
          onClick={() => {
            toggleSidebar();
          }}
        >
          <SidebarClose size={18} />
        </button>
        <SidebarGroup className="mt-5">
          <SidebarGroupLabel>LinkGrid</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <button
                        onClick={() => {
                          currMenuItem(item.title);
                        }}
                      >
                        <Icon />
                        <span>{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                    {item.title === "Links" && (
                      <SidebarMenuBadge>
                        {loading ? (
                          <Loader2 className="animate-spin" size={12} />
                        ) : (
                          user?.links.length
                        )}
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
