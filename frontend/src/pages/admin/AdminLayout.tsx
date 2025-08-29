import { Outlet, useNavigate } from "react-router-dom";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const AdminLayout = () => {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b bg-background px-4 relative">
            <SidebarTrigger />
            <div className="ml-4">
              <h2 className="text-lg font-semibold">Shoe Store Admin</h2>
            </div>
            <Button
              variant={"outline"}
              className="absolute right-12 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </header>
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
