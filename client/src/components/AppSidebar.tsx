import {
  Home,
  FileText,
  PenTool,
  Bell,
  Calendar,
  Search,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import ad1 from "@assets/generated_images/Student_app_sidebar_ad_a25a7b45.png";
import ad2 from "@assets/generated_images/Tech_education_ad_placeholder_9b35500e.png";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "All Notes",
    url: "/notes",
    icon: FileText,
  },
  {
    title: "Handwritten",
    url: "/handwritten",
    icon: PenTool,
  },
  {
    title: "Reminders",
    url: "/reminders",
    icon: Bell,
  },
  {
    title: "Schedule",
    url: "/schedule",
    icon: Calendar,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold px-4 py-4">
            HojaNote
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <div className="px-2 pb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search notes..."
                  className="w-full h-10 pl-9 pr-4 rounded-md bg-sidebar-accent text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  data-testid="input-search-notes"
                />
              </div>
            </div>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto px-2">
          <Card className="overflow-hidden p-0 border-2 hover-elevate active-elevate-2 transition-all cursor-pointer">
            <img
              src={ad1}
              alt="Advertisement"
              className="w-full h-48 object-cover"
            />
            <div className="p-2 text-center">
              <p className="text-xs text-muted-foreground">Advertisement</p>
            </div>
          </Card>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <Card className="overflow-hidden p-0 border-2 hover-elevate active-elevate-2 transition-all cursor-pointer">
          <img
            src={ad2}
            alt="Advertisement"
            className="w-full h-64 object-cover"
          />
          <div className="p-2 text-center">
            <p className="text-xs text-muted-foreground">Advertisement</p>
          </div>
        </Card>
      </SidebarFooter>
    </Sidebar>
  );
}
