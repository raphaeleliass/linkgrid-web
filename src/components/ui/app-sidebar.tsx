import { Home, Link2 } from "lucide-react";

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
} from "@/components/ui/sidebar";
import { cookies } from "next/headers";

interface UserDetails {
  name: string | null;
  username: string;
  email: string;
  links: {
    id: string;
    title: string;
    href: string;
    created_at: string;
    updated_at: string;
  }[];
}

// Menu items.
const items = [
  {
    title: "Início",
    url: "#",
    icon: Home,
    badge: false,
  },
  {
    title: "Links",
    url: "#",
    icon: Link2,
    badge: true,
  },
];

export async function AppSidebar() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  const userDetails: UserDetails = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users/me`,
    {
      next: { revalidate: 10 },
      headers: { Authorization: `bearer ${token}` },
    },
  ).then((res) => res.json());

  console.log(userDetails);

  return (
    <Sidebar variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>LinkGrid</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  {item.badge && (
                    <SidebarMenuBadge>
                      {userDetails.links.length}
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
