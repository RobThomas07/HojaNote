import { AppSidebar } from "../AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AppSidebarExample() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <h2 className="text-2xl font-semibold">Main Content Area</h2>
          <p className="text-muted-foreground mt-2">
            The sidebar navigation is shown on the left with advertisement slots.
          </p>
        </main>
      </div>
    </SidebarProvider>
  );
}
