import { AppSidebar } from "@/components/app-sidebar";
import DashboardNavbar from "@/components/dashboard-navbar";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
// import { createClient } from "@/utils/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const supabase = createClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  // console.log(user);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="w-full flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DashboardNavbar />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
