import { Link, useLocation, Outlet } from "react-router-dom";
import { LayoutDashboard, Users, Store, ClipboardList, Flag, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
  { icon: Users, label: "Users", path: "/admin/users" },
  { icon: Store, label: "Restaurants", path: "/admin/restaurants" },
  { icon: ClipboardList, label: "Orders", path: "/admin/orders" },
  { icon: Flag, label: "Moderation", path: "/admin/moderation" },
];

const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-64 border-r bg-card hidden md:flex md:flex-col fixed h-full">
        <div className="p-4 border-b flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Admin Panel</span>
        </div>
        <nav className="p-4 space-y-1 flex-1">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <Button variant={isActive ? "secondary" : "ghost"} className={`w-full justify-start gap-3 ${isActive ? "bg-primary/10 text-primary" : ""}`}>
                  <item.icon className="h-5 w-5" />{item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t">
          <Link to="/"><Button variant="ghost" size="sm">Logout</Button></Link>
        </div>
      </aside>
      <main className="flex-1 p-6 md:ml-64"><Outlet /></main>
    </div>
  );
};

export default AdminLayout;
