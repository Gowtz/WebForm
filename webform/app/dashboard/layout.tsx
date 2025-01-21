import Header from "@/components/dashboard/Header";
import { AppSidebar } from "@/components/dashboard/sidebar/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface props {
  children: React.ReactNode;
}
export default function layout({ children }: props) {
  return (
    <div className="flex">
      <SidebarProvider>
      <div>
          <AppSidebar />
      </div>
      <div className="w-full overflow-x-hidden">
        <Header />
        <div className="px-10">
          {children}
        </div>
      </div>
      </SidebarProvider>
    </div>
  );
}
