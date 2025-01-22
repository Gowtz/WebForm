'use client'
import Header from "@/components/dashboard/Header";
import { AppSidebar } from "@/components/dashboard/sidebar/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
const queryClient = new QueryClient()
interface props {
  children: React.ReactNode;
}
export default function layout({ children }: props) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex">
        <SidebarProvider>
          <div>
            <AppSidebar />
          </div>
          <div className="w-full overflow-x-hidden relative">
            <Header />
            <div className="px-10 pt-5">
                      <Toaster />
              {children}
            </div>
          </div>
        </SidebarProvider>
      </div>
    </QueryClientProvider>
  );
}
