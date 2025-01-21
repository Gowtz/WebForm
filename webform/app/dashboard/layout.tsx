import { AppSidebar } from "@/components/dashboard/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface props {
  children: React.ReactNode;
}
export default function layout({ children }: props) {
  return (
    <div className="flex">
      <div>
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>

      </div>
      <div className="px-10  w-full overflow-x-hidden">{children}</div>
    </div>
  );
}
